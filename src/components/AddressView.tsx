import { useENSAddress, useZoraUsername } from "@zoralabs/nft-hooks";

type AddressViewProps = {
  address: string;
  showChars?: number;
};

const PREFIX_ADDRESS = "0x";

export const AddressView = ({ address, showChars = 6 }: AddressViewProps) => {
  const ens = useENSAddress(address);
  const username = useZoraUsername(!ens || ens.error ? address : undefined);

  const addressFirst = address.slice(0, showChars + PREFIX_ADDRESS.length);
  const addressLast = address.slice(address.length - showChars);

  if (ens.data?.name) {
    return <span>{ens.data.name}</span>;
  }
  if (username.username?.username) {
    return <span>{`@${username.username.username}`}</span>;
  }
  if (!username.error && !username.username && !ens.error && !ens.data) {
    return <span>...</span>;
  }
  return (
    <span>
      {addressFirst}...{addressLast}
    </span>
  );
};
