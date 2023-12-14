import axios from "axios";
import { type NextRequest } from 'next/server'

export const dynamic = 'force-dynamic' // defaults to auto
export async function DELETE(request: NextRequest) {
  const strSearchParam = request.nextUrl.searchParams.toString();

  const targetURI = `${process.env.API_GATEWAY_BASE_URL}${request.nextUrl.pathname}${strSearchParam ? `?${strSearchParam}`: ""}`;

  const res = await axios.delete(targetURI);

  return Response.json({
    "result": res.data.result,
    "gateway": `${process.env.API_GATEWAY_BASE_URL}`
  });
}

// DELETE