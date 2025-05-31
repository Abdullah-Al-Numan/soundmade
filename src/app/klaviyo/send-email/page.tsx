export const dynamic = 'force-dynamic';
import SendEmailForm from "@/components/klaviyo/sendEmailForm";
import { getTemplates, getLists } from "@/lib/klaviyoApi";

export const metadata = {
  title: "Send Email",
  description: "Send emails using Klaviyo templates",
};

export default async function SendEmailPage() {
  const templatesData = await getTemplates().catch(() => null);
  const listsData = await getLists().catch(() => null);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Send Email</h1>

      {templatesData && listsData ? (
        <SendEmailForm
          templates={
            Array.isArray(templatesData.data)
              ? templatesData.data
              : [templatesData.data]
          }
          lists={
            Array.isArray(listsData.data) ? listsData.data : [listsData.data]
          }
        />
      ) : (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Failed to load templates or lists. Please check your API key and try
          again.
        </div>
      )}
    </div>
  );
}
