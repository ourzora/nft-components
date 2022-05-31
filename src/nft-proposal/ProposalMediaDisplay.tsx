import { useContext } from "react";

import { AddressView } from "../components/AddressView";
import { MediaObject } from "../components/MediaObject";
import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import type { StyleProps } from "../utils/StyleTypes";
import {
  defaultGetContentData,
  GetContentDataType,
} from "../utils/getContentDataOptions";
import { useMemo } from "react";
import {
  AuctionLike,
  AUCTION_SOURCE_TYPES,
  MARKET_INFO_STATUSES,
} from "@zoralabs/nft-hooks/dist/types";

type ProposalMediaDisplayProps = {} & StyleProps;

/** @deprecated */
export const ProposalMediaDisplay = ({
  className,
}: ProposalMediaDisplayProps) => {
  const { data } = useContext(NFTDataContext);

  const reserveAuction = useMemo(
    () =>
      data?.markets?.find(
        (market) =>
          market.source === AUCTION_SOURCE_TYPES.ZORA_RESERVE_V2 &&
          market.status !== MARKET_INFO_STATUSES.CANCELED
      ),
    [data?.markets]
  ) as undefined | AuctionLike;

  const { getStyles, getString } = useMediaContext();

  const getContent = () => {
    if (data) {
      return {
        media: (
          <MediaObject
            isFullPage={false}
            {...(defaultGetContentData(data) as GetContentDataType)}
          />
        ),
        title: data.metadata?.name,
      };
    }
    return {
      media: <div {...getStyles("mediaLoader")}></div>,
      title: "...",
    };
  };

  const { media, title } = getContent();
  const hasCreator = data?.nft?.minted?.address;
  const address = hasCreator
    ? data?.nft?.minted?.address
    : data?.nft?.owner?.address;
  return (
    <div className={className}>
      <div {...getStyles("nftProposalMediaWrapper")}>{media}</div>
      <div {...getStyles("nftProposalInfoLayout")}>
        <div {...getStyles("nftProposalTitle")}>{title}</div>
        <div {...getStyles("nftProposalLabelWrapper")}>
          <div {...getStyles("nftProposalLabel")}>
            {hasCreator
              ? getString("CARD_CREATED_BY")
              : getString("CARD_OWNED_BY")}
          </div>
          <div {...getStyles("fullOwnerAddress")}>
            {address && <AddressView address={address} />}
          </div>
        </div>
        {reserveAuction?.createdBy && (
          <div {...getStyles("nftProposalLabelWrapper")}>
            <div {...getStyles("nftProposalLabel")}>
              {getString("PROPOSED_BY")}
            </div>
            <div {...getStyles("fullOwnerAddress")}>
              {address && <AddressView address={reserveAuction?.createdBy} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
