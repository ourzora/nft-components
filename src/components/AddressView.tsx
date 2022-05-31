import { useENSAddress } from "@zoralabs/nft-hooks";
import { useMediaContext } from "../context/useMediaContext";
import type { StyleProps } from "../utils/StyleTypes";

type AddressViewProps = {
  address: string;
  showChars?: number;
} & StyleProps;

const PREFIX_ADDRESS = "0x";

export const AddressView = ({
  address,
  showChars = 6,
  className,
}: AddressViewProps) => {
  const { getStyles, style } = useMediaContext();
  const { theme } = style;

  const ens = useENSAddress(theme.useEnsResolution ? address : undefined);

  // const username = useZoraUsername(
  //   theme.useZoraUsernameResolution || ens.error ? address : undefined
  // );

  if (!address) {
    return <>...</>;
  }

  const addressFirst = address.slice(0, showChars + PREFIX_ADDRESS.length);
  const addressLast = address.slice(address.length - showChars);

  if (ens.data?.name) {
    const zoraLink = ens.data.name;
    return (
      <a
        {...getStyles("addressLink", className)}
        href={`https://zora.co/${zoraLink}`}
        target="_blank"
        rel="noreferrer"
      >
        <span>{ens.data.name}</span>
      </a>
    );
  }
  // if (username.username?.username) {
  //   return (
  //     <a
  //       {...getStyles("addressLink", className)}
  //       href={`https://zora.co/${username.username.username}`}
  //       target="_blank"
  //       rel="noreferrer"
  //     >
  //       <span>{`@${username.username.username}`}</span>
  //     </a>
  //   );
  // }

  // Username loading
  // if (
  //   theme.useZoraUsernameResolution &&
  //   !username.error &&
  //   !username.username
  // ) {
  //   return <span>...</span>;
  // }

  // Ens loading
  // if (theme.useEnsResolution && !ens.error && !ens.data) {
  //   return <span>...</span>;
  // }

  return (
    <a
      {...getStyles("addressLink", className)}
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
