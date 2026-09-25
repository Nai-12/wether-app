import { NextResponse } from "next/server";
import { ratelimit } from "@/lib/rate-limit";
import { redis } from "@/lib/redis";
import axios from "axios";
import fs from "fs";
import path from "path";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const adm3 = searchParams.get("adm3");
  const adm4 = searchParams.get("adm4");

  // ratelimiting
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.01";
  const { success } = await ratelimit.limit(ip);
  const keyCache = `weather:${adm3?.toLowerCase()}, ${adm4?.toLowerCase()}`;

  if (!success)
    return NextResponse.json({
      status: 429,
      message: "Terlalu banyak request",
    });
  // ratelimiting22

  // Error handle buat parameter undefined
  if (!adm3 && !adm4)
    return NextResponse.json({
      status: 404,
      message: "Masukan nama kecamatan serta kelurahan anda",
    });
  if (!adm3)
    return NextResponse.json({
      status: 404,
      message: "Masukan nama kecamatan anda",
    });
  if (!adm4)
    return NextResponse.json({
      status: 404,
      message: "Masukan nama kelurahan anda",
    });
  if (!/^[a-zA-Z\s,.-]+$/.test(adm3) || !/^[a-zA-Z\s,.-]+$/.test(adm4))
    return NextResponse.json({
      status: 404,
      message: "Masukan nama yang valid",
    });
  // Error handle buat parameter undefined

  // cek kalau di cache ada
  const cached = await redis.get(keyCache);
  if (cached) return NextResponse.json(cached);

  const jsonDir = path.join(process.cwd(), "public", "kecamatan_dan_desa.json");

  const readFileJson = fs.readFileSync(jsonDir, "utf-8");
  const parseJson = JSON.parse(readFileJson);
  const matchKecamatan = await parseJson.filter(
    (admName) => admName.nama === adm3,
  );

  // Error handle buat matching kecamatan
  if (Array.isArray(matchKecamatan) && matchKecamatan.length === 0)
    return NextResponse.json({
      status: 404,
      message: "Nama kecamatan tidak terdaftar",
    });
  // Error handle buat matching kecamatan

  const desa = matchKecamatan.map((list) => list.desa);
  const check =
    desa.length <= 0 ? (desa.length >= 0 ? desa[0] : desa) : desa[0];
  const matchKelurahan = await check.find((admKel) => admKel.nama === adm4);

  // Error handle buat matching kelurahan
  if (matchKelurahan === undefined)
    return NextResponse.json({
      status: 404,
      message: "Nama kelurahan tidak terdaftar",
    });
  // Error handle buat matching kelurahan

  // proses melakukan api call ke server bmkg
  try {
    const get = await axios.get(
      `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${encodeURIComponent(matchKelurahan.kode)}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    const json = await get.data;
    await redis.setex(keyCache, 600, JSON.stringify(json));
    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: "Terjadi kesalahan saat melakukan fetch api",
    });
  }
  // proses melakukan api call ke server bmkg
}
