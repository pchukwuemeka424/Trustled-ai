import { getHomeContentResponse, updateHomeContentResponse } from "@/api/home-content";

export async function GET() {
  return getHomeContentResponse();
}

export async function PUT(request: Request) {
  return updateHomeContentResponse(request);
}
