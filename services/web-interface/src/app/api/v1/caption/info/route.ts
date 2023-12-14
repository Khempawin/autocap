import axios from "axios";
import { type NextRequest } from 'next/server'

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: NextRequest) {
  const targetURI = `${process.env.API_GATEWAY_BASE_URL}${request.nextUrl.pathname}`;

  const res = await axios.get(targetURI);

  return Response.json({
    "result": res.data.result,
    "gateway": `${process.env.API_GATEWAY_BASE_URL}`
  });
}