import type { CurrencyValue } from "@zoralabs/nft-hooks";
import { Fragment } from "react";

import { useMediaContext } from "../context/useMediaContext";

export const PricingString = ({
  pricing,
  showUSD = true,
}: {
  pricing: CurrencyValue;
  showUSD?: boolean;
}) => {
  const { getStyles, style } = useMediaContext();

  const { format } = new Intl.NumberFormat(
    typeof window === "undefined" ? "en-US" : navigator.language,
    {
      style: "decimal",
      maximumFractionDigits: style.theme.maximumPricingDecimals,
    }
  );

  return (
    <Fragment>
      <span {...getStyles("pricingAmount")}>
        {format(parseFloat(pricing.prettyAmount))} {pricing.symbol}
      </span>
      {showUSD && pricing.usdValue && (
        <span {...getStyles("textSubdued")}>
          {" "}
          ${format(parseInt(pricing.usdValue, 10))}
        </span>
      )}
    </Fragment>
  );
};
