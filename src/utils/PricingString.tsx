import { PricingInfo } from "@zoralabs/nft-hooks";
import { Fragment } from "react";

import { useMediaContext } from "../context/useMediaContext";

const { format } = new Intl.NumberFormat();

export const PricingString = ({
  pricing,
  showUSD = true,
}: {
  pricing: PricingInfo;
  showUSD?: boolean;
}) => {
  const { getStyles } = useMediaContext();

  return (
    <Fragment>
      {format(parseFloat(pricing.prettyAmount))} {pricing.currency.symbol}
      {showUSD && pricing.computedValue && (
        <span {...getStyles("textSubdued")}>
          {" "}
          ${format(parseInt(pricing.computedValue?.inUSD, 10))}
        </span>
      )}
    </Fragment>
  );
};
