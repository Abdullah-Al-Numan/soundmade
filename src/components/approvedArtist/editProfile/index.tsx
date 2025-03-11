import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";
import ProfileEdit from "./ProfileEdit";
import LinkEdit from "./LinkEdit";
import { ProfileEditType } from "@/types";
import PasswordEdit from "./PasswordEdit";

const EditProfile = ({
  artistinfo,
  onClose,
  isEditModalOpen,
}: ProfileEditType & { isEditModalOpen: boolean }) => {
  const tabsData = [
    {
      value: "profile",
      label: "Profile",
      content: <ProfileEdit artistinfo={artistinfo} onClose={onClose} />,
    },
    {
      value: "link",
      label: "Link",
      content: (
        <LinkEdit socialLink={artistinfo?.validation} userId={artistinfo?.id} />
      ),
    },
    {
      value: "password",
      label: "Password",
      content: <PasswordEdit email={artistinfo?.email} />,
    },
  ];

  return (
    <Dialog open={isEditModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-full flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{artistinfo?.fullName}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Tabs defaultValue={tabsData[0]?.value} className="w-full">
          <TabsList className="flex space-x-4 border-b border-gray-200">
            {tabsData.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex-1 overflow-y-auto mt-4">
            {tabsData.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.content}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
