import { join } from "path";
import { readFile } from "fs/promises";
import { render, screen } from "@testing-library/react";
import MockDate from "mockdate";
import type { ReactNode } from "react";

import { FullComponents, NFTDataContext } from "../../src";
import fetchMock from "./fetchMock";

const loadJSON = async (name: string) => {
  const path = join(__dirname, `mock-data/test_${name}.json`);
  const { args, data } = JSON.parse(await (await readFile(path)).toString());
  console.info({ args });
  return data;
};

const TestHarness = ({
  children,
  data,
}: {
  children: ReactNode;
  data: any;
}) => {
  const nft = { data } as any;
  const metadata = { metadata: undefined, loading: true };
  return (
    <NFTDataContext.Provider value={{ nft, metadata }}>
      {children}
    </NFTDataContext.Provider>
  );
};

const getBids = () => {
  return screen.queryAllByText(/placed a bid of/i).map((item) => {
    const match = item.innerHTML.match(/[0-9,\.]+ [A-Z]+/);
    return match ? match[0] : null;
  });
};

describe("AuctionInfo", () => {
  beforeEach(() => {
    fetchMock.mock("*", 404);
  });
  afterEach(() => {
    fetchMock.reset();
    MockDate.reset();
  });
  describe("renders auction info correctly", () => {
    it("renders a auction with perpetual bids", async () => {
      const data = await loadJSON("perpetual_bids");

      render(
        <TestHarness data={data}>
          <FullComponents.BidHistory />
        </TestHarness>
      );

      expect(await screen.queryByText("listed the NFT")).toBeNull();
      await screen.findByText("minted the NFT");
      await screen.findByText(/0\.169 WETH/);
      expect(getBids()).toEqual([
        "10,000 USDC",
        "8,888 DAI",
        "163 UNI",
        "1.5 WETH",
        "150 UNI",
        "140 UNI",
        "1.25 WETH",
        "0.3 WETH",
        "0.169 WETH",
      ]);
    });

    it("renders a auction with hiding perpetual bids", async () => {
      const data = await loadJSON("perpetual_bids");

      render(
        <TestHarness data={data}>
          <FullComponents.BidHistory showPerpetual={false} />
        </TestHarness>
      );

      await screen.findByText("minted the NFT");
      expect(screen.queryByText("listed the NFT")).toBeNull();
      expect(getBids()).toEqual([]);
    });

    it("renders a auction with perpetual bids and ask", async () => {
      const data = await loadJSON("perpetual_bids_w_ask_no_bids");

      render(
        <TestHarness data={data}>
          <FullComponents.BidHistory />
        </TestHarness>
      );

      expect(getBids()).toEqual([]);
      screen.getByText("minted the NFT");
    });

    it("renders an auction with an pending reserve auction", async () => {
      const data = await loadJSON("reserve_pending_auction");

      render(
        <TestHarness data={data}>
          <FullComponents.BidHistory />
        </TestHarness>
      );

      await screen.findByText("minted the NFT");
      await screen.findByText("listed the NFT");
      // Listed timestamp.
      await screen.findByText("May 14, 10:23 PM");
    });

    it("renders a current auction with a bid", async () => {
      MockDate.set(1623156928000);
      const data = await loadJSON("reserve_active_auction");

      render(
        <TestHarness data={data}>
          <FullComponents.BidHistory />
        </TestHarness>
      );

      await screen.findByText("minted the NFT");
      await screen.findByText("listed the NFT");
      expect(getBids()).toEqual(["0.1 ETH"]);
    });

    it("renders finished reserve auction", async () => {
      const data = await loadJSON("reserve_auction_complete");

      render(
        <TestHarness data={data}>
          <FullComponents.BidHistory />
        </TestHarness>
      );

      await screen.findAllByText("May 14, 10:23 PM");
      await screen.findByText("minted the NFT");
      await screen.findByText("listed the NFT");
      expect(getBids()).toEqual(["0.4 ETH"]);
    });
    it("renders finalized reserve auction", async () => {
      const data = await loadJSON("doge_auction_finished");

      render(
        <TestHarness data={data}>
          <FullComponents.BidHistory />
        </TestHarness>
      );

      await screen.findAllByText("June 11, 12:25 PM");
      await screen.findByText("minted the NFT");
      await screen.findByText("listed the NFT");
    });
  });
});
