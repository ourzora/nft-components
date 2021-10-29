import { useENSAddress, useZoraUsername } from "@zoralabs/nft-hooks";
import { useMediaContext } from "../context/useMediaContext";

type AddressViewProps = {
  address: string;
  showChars?: number;
  useEns?: boolean;
};

const PREFIX_ADDRESS = "0x";

export const AddressView = ({
  address,
  showChars = 6,
  useEns = true,
}: AddressViewProps) => {
  const { getStyles } = useMediaContext();
  // @ts-ignore (address can be undefined but not typed correctly for now)
  const ens = useENSAddress(useEns ? address : undefined);
  const username = useZoraUsername(!useEns || ens.error ? address : undefined);

  const addressFirst = address.slice(0, showChars + PREFIX_ADDRESS.length);
  const addressLast = address.slice(address.length - showChars);

  if (ens.data?.name) {
    const zoraLink = ens.data.name.endsWith('.ens') ? ens.data.name : address;
    return (
      <a
        {...getStyles("addressLink")}
        href={`https://zora.co/${zoraLink}`}
        target="_blank"
        rel="noreferrer"
      >
        <span>{ens.data.name}</span>
      </a>
    );
  }
  if (username.username?.username) {
    return (
      <a
        {...getStyles("addressLink")}
        href={`https://zora.co/${username.username.username}`}
        target="_blank"
        rel="noreferrer"
      >
        <span>{`@${username.username.username}`}</span>
      </a>
    );
  }

  // Username loading
  if (!username.error && !username.username) {
    return <span>...</span>;
  }

  // Ens loading
  if (useEns && !ens.error && !ens.data) {
    return <span>...</span>;
  }

  return (
    <a
      {...getStyles("addressLink")}
      href={`https://etherscan.io/address/${address}`}
      target="_blank"
      rel="noreferrer"
    >
      <span>
        {addressFirst}...{addressLast}
      </span>
    </a>
  );
};
