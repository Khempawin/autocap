import axios from "axios";
import { type NextRequest } from 'next/server'

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: NextRequest) {
  const strSearchParam = request.nextUrl.searchParams.toString();

  const targetURI = `${process.env.API_GATEWAY_BASE_URL}${request.nextUrl.pathname}${strSearchParam ? `?${strSearchParam}`: ""}`;

  console.log(request.headers.get("Content-Type"));
  const res = await axios.post(targetURI, await request.formData(), {
    headers: {
      "Content-Type" : "multipart/form-data"
    }
  });

  return Response.json(res.data);
}

// POST