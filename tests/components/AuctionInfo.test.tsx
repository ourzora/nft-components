import { readFile } from "fs/promises";
import type { ReactNode } from "react";
import { join } from "path";
import { render, screen } from "@testing-library/react";
import MockDate from "mockdate";

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

describe("AuctionInfo", () => {
  beforeEach(() => {
    fetchMock.mock("*", 404);
    MockDate.set('2020-01-01');
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
          <FullComponents.AuctionInfo />
        </TestHarness>
      );

      await screen.findByText("Highest bid");
      const weth = await screen.findByText(/[0-9.]+ WETH/);
      expect(weth.innerHTML).toEqual("1.5 WETH");
    });

    it("renders a auction with perpetual bids and ask", async () => {
      const data = await loadJSON("perpetual_bids_w_ask_no_bids");

      render(
        <TestHarness data={data}>
          <FullComponents.AuctionInfo />
        </TestHarness>
      );

      const weth = await screen.findByText(/[0-9.]+ WETH/);
      expect(weth.innerHTML).toEqual("10,000 WETH");
      await screen.findByText("Open offers");
      await screen.findByText("Be the first one to bid on this piece!");
    });

    it("renders an auction with an pending reserve auction", async () => {
      const data = await loadJSON("reserve_pending_auction");

      render(
        <TestHarness data={data}>
          <FullComponents.AuctionInfo />
        </TestHarness>
      );

      await screen.findByText("Reserve price");
      const weth = await screen.findByText(/[0-9.]+ ETH/);
      expect(weth.innerHTML).toContain("0.1 ETH");
    });

    it("renders a current auction with a bid", async () => {
      MockDate.set(1623156928000);
      const data = await loadJSON("reserve_active_auction");

      render(
        <TestHarness data={data}>
          <FullComponents.AuctionInfo />
        </TestHarness>
      );

      screen.getByText("Auction ends");
      screen.getByText(/12s/);
      screen.getByText("Highest bid");
      screen.getByText(/0\.1[ \t]*ETH/);
      screen.getByText("Bidder");
    });

    it("renders finished reserve auction", async () => {
      const data = await loadJSON("reserve_auction_complete");

      render(
        <TestHarness data={data}>
          <FullComponents.AuctionInfo />
        </TestHarness>
      );

      await screen.findByText("Sold for");
      await screen.findByText(/0.4 ETH/);
      await screen.findByText("Winner");
    });
  });

  describe("hides perpetual auction information", () => {
    it("does not render info for perpetual bids when disabled", async () => {
      const data = await loadJSON("perpetual_bids");

      render(
        <TestHarness data={data}>
          <FullComponents.AuctionInfo showPerpetual={false} />
        </TestHarness>
      );

      expect(await screen.queryByText("Highest bid")).toBeNull();
    });

    it("renders a auction with perpetual bids", async () => {
      const data = await loadJSON("perpetual_bids");

      render(
        <TestHarness data={data}>
          <FullComponents.AuctionInfo showPerpetual={false} />
        </TestHarness>
      );

      expect(await screen.queryByText("Highest bid")).toBeNull();
    });

    it("renders a auction with perpetual bids and ask", async () => {
      const data = await loadJSON("perpetual_bids_w_ask_no_bids");

      render(
        <TestHarness data={data}>
          <FullComponents.AuctionInfo showPerpetual={false} />
        </TestHarness>
      );

      expect(await screen.queryByText(/[0-9.]+ WETH/)).toBeNull();
      expect(await screen.queryByText("Open offers")).toBeNull();
    });

    it("renders an auction with an pending reserve auction", async () => {
      const data = await loadJSON("reserve_pending_auction");

      render(
        <TestHarness data={data}>
          <FullComponents.AuctionInfo showPerpetual={false} />
        </TestHarness>
      );

      await screen.findByText("Reserve price");
      const weth = await screen.findByText(/[0-9.]+ ETH/);
      expect(weth.innerHTML).toContain("0.1 ETH");
    });

    it("renders a current auction with a bid", async () => {
      MockDate.set(1623156928000);
      const data = await loadJSON("reserve_active_auction");

      render(
        <TestHarness data={data}>
          <FullComponents.AuctionInfo showPerpetual={false} />
        </TestHarness>
      );

      await screen.findByText("Auction ends");
      await screen.findByText(/12s/);
      await screen.findByText("Highest bid");
      await screen.findByText(/0\.1[ \t]*ETH/);
      await screen.findByText("Bidder");
    });

    it("renders finished reserve auction", async () => {
      const data = await loadJSON("reserve_auction_complete");

      render(
        <TestHarness data={data}>
          <FullComponents.AuctionInfo showPerpetual={false} />
        </TestHarness>
      );

      await screen.findByText("Sold for");
      await screen.findByText(/0.4 ETH/);
      await screen.findByText("Winner");
    });
  });
});
