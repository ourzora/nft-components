import { NetworkIDs } from "@zoralabs/nft-hooks";
import React, { useState } from "react";

import {
  MediaConfiguration,
  NFTFullPage,
  NFTPreview,
  Networks,
} from "../../src";

export const Page = () => {
  const [detail, setDetail] = useState<{ id: string; network: NetworkIDs }>();
  if (detail) {
    return (
      <MediaConfiguration networkId={detail.network}>
        <NFTFullPage id={detail.id} />
      </MediaConfiguration>
    );
  }

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      <MediaConfiguration networkId={Networks.MAINNET}>
        <NFTPreview
          id="3095"
          onClick={() => setDetail({ id: "3095", network: Networks.MAINNET })}
        />
      </MediaConfiguration>
      <MediaConfiguration networkId={Networks.RINKEBY}>
        <NFTPreview
          id="2663"
          onClick={() => setDetail({ id: "2663", network: Networks.RINKEBY })}
        />
        <NFTPreview
          id="2662"
          onClick={() => setDetail({ id: "2662", network: Networks.RINKEBY })}
        />
        <NFTPreview
          id="2671"
          onClick={() => setDetail({ id: "2671", network: Networks.RINKEBY })}
        />
      </MediaConfiguration>
    </div>
  );
};
