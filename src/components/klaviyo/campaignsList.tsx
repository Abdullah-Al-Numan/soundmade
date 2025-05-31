"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import type { KlaviyoResponse, KlaviyoCampaign } from "@/lib/klaviyoTypes";
import Link from "next/link";

interface CampaignsListProps {
  initialCampaigns: KlaviyoResponse<KlaviyoCampaign>;
}

export default function CampaignsList({
  initialCampaigns,
}: CampaignsListProps) {
  const [campaigns] = useState<KlaviyoCampaign[]>(
    Array.isArray(initialCampaigns.data)
      ? initialCampaigns.data
      : [initialCampaigns.data]
  );

  const handleCampaignSend = async (campaignId: string) => {
    try {
      const response = await fetch('/api/klaviyo/send-campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send cam email');
      }

      const result = await response.json();
      console.log("🚀 ~ handleSubmit ~ result:", result)
      window.alert("Campaign email sent successfully!");
      window.location.reload();

    } catch (error: any) {
      console.log("Error sending campaign email:", error);
    }
  };

  const handleCampaignDelete = async (campaignId: string) => {
    try {
      await fetch(`/api/klaviyo/delete-campaign?campaignId=${campaignId}`, {
        method: 'DELETE',
      });
      alert('Campaign deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting campaign:', error);
      alert('Failed to delete campaign.');
    }
  };

  const handleCloneCampaign = async (campaignId: string, newName: string) => {
    try {
      const response = await fetch('/api/klaviyo/clone-campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ campaignId, newName }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);

      alert('Campaign cloned successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error cloning campaign:', error);
      alert('Failed to clone campaign.');
    }
  };



  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Send Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {campaign.attributes.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${campaign.attributes.status === "Sent"
                        ? "bg-green-100 text-green-800"
                        : campaign.attributes.status === "Draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {campaign.attributes.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(
                      new Date(campaign.attributes.created_at),
                      "MMM d, yyyy"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.attributes.send_time
                      ? format(
                        new Date(campaign.attributes.send_time),
                        "MMM d, yyyy h:mm a"
                      )
                      : "Not sent"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link
                      href={`/klaviyo/campaigns/${campaign.id}`}
                      className="text-indigo-600 hover:text-indigo-900 inline-flex items-center gap-1"
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </Link>
                    {
                      campaign.attributes.status !== "Sent" && (
                        <button
                          onClick={() => handleCampaignSend(campaign.id)}
                          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Send
                        </button>
                      )
                    }
                    {
                      campaign.attributes.status !== "Sent" && (
                        <button
                          onClick={() => handleCampaignDelete(campaign.id)}
                          className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      )
                    }
                    <button
                      onClick={() => handleCloneCampaign(
                        campaign.id,
                        `${campaign.attributes.name} (Clone ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()})`
                      )}
                      className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Clone
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No campaigns found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
