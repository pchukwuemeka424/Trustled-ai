import {
  createCustomPageResponse,
  listCustomPagesResponse,
} from "@/lib/api/custom-pages";

export async function GET() {
  return listCustomPagesResponse();
}

export async function POST(request: Request) {
  return createCustomPageResponse(request);
}
