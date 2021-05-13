import React from "react";

type AddressViewProps = {
  address: string;
  showChars?: number;
};

const PREFIX_ADDRESS = "0x";

export const AddressView = ({ address, showChars = 6 }: AddressViewProps) => {
  const addressFirst = address.slice(0, showChars + PREFIX_ADDRESS.length);
  const addressLast = address.slice(address.length - showChars);
  return (
    <span>
      {addressFirst}...{addressLast}
    </span>
  );
};
