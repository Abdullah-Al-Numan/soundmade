import React from "react";
const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      {children}
    </div>
  );
};

export default Card;
