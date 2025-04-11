import PaginatedTable from "@/components/paginatedTable";
import { Input } from "@/components/ui/input";
import { PAYMENT_INFO } from "@/gql/payment";
import { PaymentInfoData } from "@/types";
import { tablePaymentHeadData } from "@/utils/tableHeadData";
import { useQuery } from "@apollo/client";
import React, { useMemo, useState } from "react";

const PaymentInfo = () => {
  const { data, loading, error } = useQuery<{
    getSubscriptionPaymentInfo: PaymentInfoData[];
  }>(PAYMENT_INFO, {
    fetchPolicy: "network-only",
  });

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredData = useMemo(() => {
    if (!data?.getSubscriptionPaymentInfo) return [];
    return data.getSubscriptionPaymentInfo.filter((payment) => {
      const customerName = payment?.customerName.toLowerCase() || "";
      const userName = payment?.users?.fullName?.toLowerCase() || "";
      const userEmail = payment?.users?.email?.toLowerCase() || "";
      const artistName = payment?.artists?.fullName?.toLowerCase() || "";
      const artistEmail = payment?.artists?.email?.toLowerCase() || "";
      const transactionIdentifier =
        payment?.transactionIdentifier?.toLowerCase() || "";

      return (
        customerName.includes(searchQuery.toLowerCase()) ||
        userName.includes(searchQuery.toLowerCase()) ||
        userEmail.includes(searchQuery.toLowerCase()) ||
        artistName.includes(searchQuery.toLowerCase()) ||
        artistEmail.includes(searchQuery.toLowerCase()) ||
        transactionIdentifier.includes(searchQuery.toLowerCase())
      );
    });
  }, [data?.getSubscriptionPaymentInfo, searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-slate-500 animate-pulse text-sm">
          Loading payment info...
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500 text-sm">
           No Payment information found.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Input
        type="text"
        placeholder="Search by Name, Email or Subscription"
        className="my-2 w-full md:w-1/2 lg:w-1/4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredData.length > 0 ? (
        <PaginatedTable
          tableHeadData={tablePaymentHeadData}
          tableData={filteredData}
          title="Posts"
          perPage={10}
          renderRow={(payment, rowIndex) => (
            <tr
              key={payment.id}
              className="hover:bg-slate-50 border-b border-slate-200"
            >
              <td className="px-3 py-3">
                <p className="text-sm text-slate-500">{rowIndex + 1}</p>
              </td>
              <td className="px-3 py-3">{payment?.customerName}</td>
              <td className="px-3 py-3">
                <p className="text-sm text-slate-500">
                  {payment?.transactionIdentifier}
                </p>
              </td>
              <td className="px-3 py-3">
                <p className="text-sm text-slate-500">
                  {payment?.purchaseDate}
                </p>
              </td>
              <td className="px-3 py-3 flex gap-1">{payment?.status}</td>
              <td className="px-3 py-3">
                <p className="text-sm text-slate-500">
                  {payment?.users?.fullName}
                </p>
              </td>
              <td className="px-3 py-3">
                <p className="text-sm text-slate-500">
                  {payment?.users?.email}
                </p>
              </td>
              <td className="px-3 py-3">
                <p className="text-sm text-slate-500">
                  {payment?.artists?.fullName}
                </p>
              </td>
              <td className="px-3 py-3">
                <p className="text-sm text-slate-500">
                  {payment?.artists?.email}
                </p>
              </td>
            </tr>
          )}
        />
      ) : (
        <div className="text-center text-slate-500 py-10">
          No payment information found for the search criteria.
        </div>
      )}
    </div>
  );
};

export default PaymentInfo;
