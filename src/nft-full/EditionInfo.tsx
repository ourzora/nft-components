import { Fragment, useContext } from "react";
import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import type { StyleProps } from "../utils/StyleTypes";
import { InfoContainer, InfoContainerProps } from "./InfoContainer";
import { useMemo } from "react";
import type { EditionLike } from "@zoralabs/nft-hooks/dist/types";
import { PricingString } from "../utils/PricingString";

export const EditionInfo = ({ className }: StyleProps) => {
  const { data } = useContext(NFTDataContext);
  const { getStyles, getString } = useMediaContext();

  const edition = useMemo(
    () =>
      data?.markets?.find(
        (market) => market.type === "Edition" && market.status === "active"
      ),
    [data?.markets]
  ) as undefined | EditionLike;

  const EditionInfoWrapper = ({
    children,
    ...containerArgs
  }: InfoContainerProps) => (
    <InfoContainer {...containerArgs} className={className}>
      {children}
    </InfoContainer>
  );

  if (!edition) {
    return <Fragment />;
  }

  return (
    <EditionInfoWrapper titleString="EDITION_PRICE">
      <div {...getStyles("pricingAmount")}>
        {edition.amount?.amount && (
          <PricingString pricing={edition.amount} showUSD={false} />
        )}
        <div>
          <div {...getStyles("fullInfoSpacer")} />
          <div {...getStyles("fullLabel")}>{getString("NFTS_COLLECTED")}</div>
          {`${edition.totalSupply} / ${edition.editionSize}`}
        </div>
      </div>
    </EditionInfoWrapper>
  );
};
