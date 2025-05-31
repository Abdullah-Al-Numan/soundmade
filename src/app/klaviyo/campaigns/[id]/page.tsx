import { getCampaignById, getCampaignMessageContent } from "@/lib/klaviyoApi";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Campaign Details",
  description: "View campaign details and content",
};

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const campaignData = await getCampaignById(id).catch(() => null);

  if (!campaignData) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Failed to load campaign. Please check your API key and try again.
        </div>
      </div>
    );
  }

  const campaign = campaignData.data;
  const messageId = campaign.relationships?.campaign_messages?.data?.[0]?.id;

  const messageContent = messageId
    ? await getCampaignMessageContent(messageId).catch(() => null)
    : null;

  return (
    <div className="container mx-auto py-8">
      <Link
        href="/klaviyo/campaigns"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-900 mb-6"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Campaigns
      </Link>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            {campaign.attributes.name}
          </h1>
        </div>

        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Campaign Details
              </h2>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        campaign.attributes.status === "sent"
                          ? "bg-green-100 text-green-800"
                          : campaign.attributes.status === "draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {campaign.attributes.status}
                    </span>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {format(
                      new Date(campaign.attributes.created_at),
                      "MMM d, yyyy h:mm a"
                    )}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Send Time
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {campaign.attributes.send_time
                      ? format(
                          new Date(campaign.attributes.send_time),
                          "MMM d, yyyy h:mm a"
                        )
                      : "Not sent"}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Send Method
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {campaign.attributes.send_strategy?.method || "N/A"}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Tracking Options
              </h2>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Track Opens
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {campaign.attributes.tracking_options?.is_tracking_opens
                      ? "Yes"
                      : "No"}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Track Clicks
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {campaign.attributes.tracking_options?.is_tracking_clicks
                      ? "Yes"
                      : "No"}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Add UTM</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {campaign.attributes.tracking_options?.is_add_utm
                      ? "Yes"
                      : "No"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {messageContent && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900">Email Content</h2>
          </div>

          <div className="px-6 py-4">
            <div className="border rounded-lg overflow-hidden">
              <iframe
                srcDoc={
                  messageContent.data?.attributes?.html ||
                  "<p>No HTML content available</p>"
                }
                className="w-full h-[600px] border-0"
                title="Email Content Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
