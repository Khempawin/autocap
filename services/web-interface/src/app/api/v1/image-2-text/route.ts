import axios from "axios";
import { type NextRequest } from 'next/server'

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: NextRequest) {
  const strSearchParam = request.nextUrl.searchParams.toString();

  const targetURI = `${process.env.API_GATEWAY_BASE_URL}${request.nextUrl.pathname}${strSearchParam ? `?${strSearchParam}`: ""}`;

  const formData = await request.formData();
  console.log(formData);
  console.log(targetURI);

  const res = await axios.post(targetURI, formData, {
    headers: {
      "Content-Type" : request.headers.get("Content-Type")
    }
  });


  return Response.json(res.data);
}

// POST