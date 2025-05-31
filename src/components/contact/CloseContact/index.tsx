import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Button from "@/components/button";
import PaginatedTable from "@/components/paginatedTable";
import ContactDetails from "../ContactDetails";
import { GET_ALL_CLOSE_CONTACT } from "@/gql/contact";
import { ContactData } from "@/types";
import { Limit } from "@/utils/constant";
import { Input } from "@/components/ui/input";

const NewContact = () => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactData | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { data, refetch } = useQuery<{
    getAllCloseContact: ContactData[];
  }>(GET_ALL_CLOSE_CONTACT, {
    variables: { limit: Limit, offset: 0 },
    fetchPolicy: "network-only",
  });

  const tableHeadData = ["SL", "Name", "Email", "Reason", "Comment", "Action"];
  const tableData = data?.getAllCloseContact ?? [];

  const filteredData = tableData.filter((contact) => {
    const name = contact.user?.name?.toLowerCase() || "";
    const email = contact.user?.email?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    return name.includes(query) || email.includes(query);
  });

  const closeDetailsModal = () => {
    refetch();
    setIsDetailsModalOpen(false);
  };

  const openDetailsModal = (row: ContactData) => {
    setSelectedContact(row);
    setIsDetailsModalOpen(true);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Type Name or Email for search"
        className="my-2 w-full md:w-1/2 lg:w-1/4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <PaginatedTable
        tableHeadData={tableHeadData}
        tableData={filteredData}
        title="Contact Messages"
        perPage={5}
        renderRow={(row, rowIndex) => (
          <tr
            key={row.id}
            className="hover:bg-slate-50 border-b border-slate-200"
          >
            <td className="px-3 py-3 text-sm text-slate-500">{rowIndex + 1}</td>
            <td className="px-3 py-3 text-sm text-slate-500">
              {row?.user?.name || "N/A"}
            </td>
            <td className="px-3 py-3 text-sm text-slate-500">
              {row?.user?.email || "N/A"}
            </td>
            <td className="px-3 py-3 text-sm text-slate-500">{row?.reason}</td>
            <td className="px-3 py-3 text-sm text-slate-500">{row?.comment}</td>
            <td className="px-3 py-3 flex gap-1">
              <Button
                onClick={() => openDetailsModal(row)}
                title="Details"
                customClass="text-[8px] px-1.5 py-1"
              />
            </td>
          </tr>
        )}
      />

      {isDetailsModalOpen && selectedContact && (
        <ContactDetails
          isDetailsModalOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
          selectedContact={selectedContact}
        />
      )}
    </div>
  );
};

export default NewContact;
