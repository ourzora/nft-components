/** @jsx jsx */
import { jsx } from "@emotion/react";

import { MediaFull } from "./MediaFull";
import { PricingComponent } from "../components/PricingComponent";
import { useMediaContext } from "../context/useMediaContext";
import { ProofAuthenticity } from "./ProofAuthenticity";
import { NFTDataProvider } from "../context/NFTDataProvider";

type NFTFullPageProps = {
  id: string;
  showBids?: boolean;
  showAuthenticity?: boolean;
};

export const NFTFullPage = ({ id, showBids = true, showAuthenticity = true }: NFTFullPageProps) => {
  const { getStyles } = useMediaContext();

  return (
    <NFTDataProvider id={id}>
      <div {...getStyles("fullPage")}>
        <MediaFull />
        <div style={{ height: "20px" }} />
        {showBids && <PricingComponent />}
        {showAuthenticity && <ProofAuthenticity />}
      </div>
    </NFTDataProvider>
  );
};
