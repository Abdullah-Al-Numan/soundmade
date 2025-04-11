import type React from "react";
import Link from "next/link";

export default function KlaviyoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Klaviyo Integration
          </h1>
          <nav className="mt-4">
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/klaviyo/campaigns"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Campaigns
                </Link>
              </li>
              <li>
                <Link
                  href="/klaviyo/send-email"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Send Email
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="py-6">{children}</main>
    </div>
  );
}
