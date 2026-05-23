import {
  getSiteSettingsResponse,
  updateSiteSettingsResponse,
} from "@/api/site-settings";

export async function GET() {
  return getSiteSettingsResponse();
}

export async function PUT(request: Request) {
  return updateSiteSettingsResponse(request);
}
