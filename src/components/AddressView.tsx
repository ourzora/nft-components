import { useZoraUsername } from "@zoralabs/nft-hooks";

type AddressViewProps = {
  address: string;
  showChars?: number;
};

const PREFIX_ADDRESS = "0x";

export const AddressView = ({ address, showChars = 6 }: AddressViewProps) => {
  const username = useZoraUsername(address);

  const addressFirst = address.slice(0, showChars + PREFIX_ADDRESS.length);
  const addressLast = address.slice(address.length - showChars);

  if (username.username?.username) {
    return <span>{`@${username.username.username}`}</span>;
  }
  if (!username.error && !username.username) {
    return <span>...</span>;
  }
  return (
    <span>
      {addressFirst}...{addressLast}
    </span>
  );
};
