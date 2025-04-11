import Link from "next/link";
import { Mail, BarChart } from "lucide-react";

export const metadata = {
  title: "Klaviyo Integration",
  description: "Manage your Klaviyo email campaigns and track events",
};

export default function KlaviyoIndexPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/klaviyo/campaigns">
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Mail className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Campaigns
                </h2>
                <p className="text-gray-500">
                  View and manage your email campaigns
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/klaviyo/send-email">
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <BarChart className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Send Email
                </h2>
                <p className="text-gray-500">
                  Send emails using Klaviyo templates
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
