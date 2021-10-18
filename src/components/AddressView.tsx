import { useZoraUsername } from "@zoralabs/nft-hooks";
import { useMediaContext } from "../context/useMediaContext";

type AddressViewProps = {
  address: string;
  showChars?: number;
};

const PREFIX_ADDRESS = "0x";

export const AddressView = ({ address, showChars = 6 }: AddressViewProps) => {
  const { getStyles } = useMediaContext();
  const username = useZoraUsername(address);

  const addressFirst = address.slice(0, showChars + PREFIX_ADDRESS.length);
  const addressLast = address.slice(address.length - showChars);

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
  if (!username.error && !username.username) {
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
