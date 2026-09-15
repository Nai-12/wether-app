import { NextResponse } from "next/server";
import { ratelimit } from "@/lib/rate-limit";
import { redis } from "@/lib/redis";
import axios from "axios";
import fs from "fs";
import path from "path";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // ratelimiting
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.01";
  const { success } = await ratelimit.limit(ip);
  const adm3 = searchParams.get("adm3");
  const adm4 = searchParams.get("adm4");
  const keyCache = `weather:${adm3?.toLowerCase()}, ${adm4?.toLowerCase()}`;

  if (!success)
    return NextResponse.json({ code: 429, message: "Terlalu banyak request" });
  if (!adm3 && !adm4)
    return NextResponse.json({
      code: 404,
      message: "Masukan nama kecamatan serta kelurahan anda",
    });

  // cek kalau di cache ada
  const cached = await redis.get(keyCache);
  if (cached) return NextResponse.json(cached);

  const jsonDir = path.join(process.cwd(), "public", "kecamatan_dan_desa.json");

  const readFileJson = fs.readFileSync(jsonDir, "utf-8");
  const parseJson = JSON.parse(readFileJson);
  const matchKecamatan = await parseJson.filter(
    (admName) => admName.nama === adm3,
  );

  const desa = matchKecamatan.map((list) => list.desa);
  const check =
    desa.length <= 0 ? (desa.length >= 0 ? desa[0] : desa) : desa[0];
  const matchKelurahan = await check.find((admKel) => admKel.nama === adm4);

  // proses melakukan api call ke server bmkg
  try {
    const get = await axios.get(
      `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${matchKelurahan.kode}`,
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
      code: 500,
      message: "Terjadi kesalahan saat melakukan fetch api",
    });
  }
  // proses melakukan api call ke server bmkg
}
