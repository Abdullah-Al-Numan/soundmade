"use client";

import { useState } from "react";
import type { KlaviyoTemplate, KlaviyoList } from "@/lib/klaviyoTypes";
import { toast } from "react-toastify";

interface SendEmailFormProps {
  templates: KlaviyoTemplate[];
  lists: KlaviyoList[];
}

export default function SendEmailForm({ templates, lists }: SendEmailFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [selectedList, setSelectedList] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [fromEmail, setFromEmail] = useState<string>("");
  const [fromName, setFromName] = useState<string>("");
  const [replyToEmail, setReplyToEmail] = useState<string>("");
  const [previewHtml, setPreviewHtml] = useState<string>("");
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateId = e.target.value;
    setSelectedTemplate(templateId);

    const template = templates.find((t) => t.id === templateId);
    if (template && template.attributes) {
      setPreviewHtml(template.attributes.html);
    } else {
      setPreviewHtml("");
    }
    
    setZoomLevel(100);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTemplate || !selectedList || !subject || !fromEmail || !fromName) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/klaviyo/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: selectedTemplate,
          listId: selectedList,
          subject,
          fromEmail,
          fromName,
          replyToEmail: replyToEmail || fromEmail,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send email');
      }

      const result = await response.json();
      console.log("🚀 ~ handleSubmit ~ result:", result)
      window.alert("Email sent successfully!");
      
      // Reset form
      setSelectedTemplate("");
      setSelectedList("");
      setSubject("");
      setFromEmail("");
      setFromName("");
      setReplyToEmail("");
      setPreviewHtml("");
      setZoomLevel(100);      
    } catch (error: any) {
      console.log("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-xl font-medium text-gray-900">
          Send Email Using Klaviyo Template
        </h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="template"
                  className="block text-sm font-medium text-gray-700"
                >
                  Template *
                </label>
                <select
                  id="template"
                  value={selectedTemplate}
                  onChange={handleTemplateChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  required
                >
                  <option value="">Select a template</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.attributes.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="list"
                  className="block text-sm font-medium text-gray-700"
                >
                  List *
                </label>
                <select
                  id="list"
                  value={selectedList}
                  onChange={(e) => setSelectedList(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  required
                >
                  <option value="">Select a list</option>
                  {lists.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.attributes.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="fromName"
                  className="block text-sm font-medium text-gray-700"
                >
                  From Name *
                </label>
                <input
                  type="text"
                  id="fromName"
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="fromEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  From Email *
                </label>
                <input
                  type="email"
                  id="fromEmail"
                  value={fromEmail}
                  onChange={(e) => setFromEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="replyToEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reply-To Email (optional)
                </label>
                <input
                  type="email"
                  id="replyToEmail"
                  value={replyToEmail}
                  onChange={(e) => setReplyToEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Email"}
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Template Preview
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 50}
                    className="p-1 text-gray-600 hover:text-gray-900 disabled:text-gray-300"
                    title="Zoom Out"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="text-sm text-gray-600 w-12 text-center">{zoomLevel}%</span>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 200}
                    className="p-1 text-gray-600 hover:text-gray-900 disabled:text-gray-300"
                    title="Zoom In"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    disabled={zoomLevel === 100}
                    className="p-1 text-gray-600 hover:text-gray-900 disabled:text-gray-300 ml-2"
                    title="Reset Zoom"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden bg-gray-50 h-[500px] relative">
                {previewHtml ? (
                  <div 
                    className="w-full h-full"
                    style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: '0 0' }}
                  >
                    <iframe
                      srcDoc={previewHtml}
                      className="w-full h-full border-0"
                      title="Template Preview"
                      sandbox="allow-same-origin"
                      style={{ width: `${100 / (zoomLevel / 100)}%`, height: `${100 / (zoomLevel / 100)}%` }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Select a template to see preview
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}