import { useZoraUsername } from "@zoralabs/nft-hooks";
import { AddressView } from "src/components/AddressView";
import { useMediaContext } from "src/context/useMediaContext";

type ProposalUserViewProps = {
  address: string;
};

export const ProposalUserView = ({ address }: ProposalUserViewProps) => {
  const { getStyles } = useMediaContext();
  const username = useZoraUsername(address);

  return (
    <div {...getStyles("nftProposalUserView")}>
      {username.username?.profile_image_url && (
        <img
          src={username.username?.profile_image_url}
          width="50"
          height="50"
          alt={username.username?.name}
        />
      )}
      <span>
        <AddressView address={address} />
        {username.username?.name && (
          <span {...getStyles("textSubdued")}>{username.username.name}</span>
        )}
      </span>
    </div>
  );
};
