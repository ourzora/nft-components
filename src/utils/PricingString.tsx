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
      {pricing.amount.value && (
        <span {...getStyles("pricingAmount")}>
          {format(pricing.amount.value)} {pricing.symbol}
        </span>
      )}
      {showUSD && pricing.usd?.value && (
        <span {...getStyles("textSubdued")}>
          {" "}
          ${format(pricing.usd?.value)}
        </span>
      )}
    </Fragment>
  );
};
