export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
  console.log(process.env.API_GATEWAY_BASE_URL);
  return Response.json({
    "result": "Success",
    "gateway": `${process.env.API_GATEWAY_BASE_URL}`
  });
}