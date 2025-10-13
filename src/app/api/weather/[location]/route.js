import axios from "axios";
import { NextResponse } from "next/server";

const apikey = process.env.KEY;

export async function GET(_, { params }) {
  const { location } = await params;
  const api = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${location}&days=3&aqi=yes&alerts=no`
  );
  const data = await api.data;
  return NextResponse.json(data);
}
