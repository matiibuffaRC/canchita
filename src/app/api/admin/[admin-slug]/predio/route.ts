import { getPredios } from "../../../../../controllers/predio.controller";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ "admin-slug": string }> },
) {
  const { "admin-slug": slug } = await params;
  return getPredios(slug);
}
