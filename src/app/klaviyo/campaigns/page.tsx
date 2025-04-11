import CampaignsList from "@/components/klaviyo/campaignsList";
import { getCampaigns } from "@/lib/klaviyoApi";

export const metadata = {
  title: "Send campaigns",
  description: "Send emails using Klaviyo campaigns",
};

export default async function SendCampaignPage() {
  const campaignsData = await getCampaigns().catch(() => null);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Send email campaigns</h1>

      {campaignsData ? (
        <CampaignsList initialCampaigns={campaignsData} />
      ) : (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Failed to load campaigns. Please check your API key and try
          again.
        </div>
      )}
    </div>
  );
}
