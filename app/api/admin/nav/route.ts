import {
  getSiteNavResponse,
  updateSiteNavResponse,
} from "@/lib/api/site-nav";

export async function GET() {
  return getSiteNavResponse();
}

export async function PUT(request: Request) {
  return updateSiteNavResponse(request);
}
