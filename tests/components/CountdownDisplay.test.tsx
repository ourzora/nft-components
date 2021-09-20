import { render, screen } from "@testing-library/react";
import {
  CountdownDisplay,
  DurationDisplay,
} from "../../src/components/CountdownDisplay";

describe("CountdownDisplay", () => {
  it("renders countdown with days", async () => {
    const now = new Date().getTime();
    const past = new Date(now - 100000).getTime();
    render(<CountdownDisplay from={past} to={now} />);

    await screen.findByText("1d 3h 46m 40s");
  });

  it.only.each`
    offset   | expected
    ${1}     | ${"1s"}
    ${60}    | ${"1m 0s"}
    ${3600}  | ${"1h 0m 0s"}
    ${3601}  | ${"1h 0m 1s"}
    ${86401} | ${"1d 0h 0m 1s"}
    ${-400}  | ${"0s"}
  `(
    "returns $expected from $offset",
    async ({ offset, expected }: { offset: number; expected: string }) => {
      render(<CountdownDisplay from={0} to={offset} />);

      await screen.findByText(expected);
    }
  );
  describe("renders duration with keys", () => {
    it.only.each`
      duration | expected
      ${1}     | ${"1 second"}
      ${60}    | ${"1 minute"}
      ${120}   | ${"2 minutes"}
      ${3600}  | ${"1 hour"}
      ${3601}  | ${"1h 0m 1s"}
      ${86401} | ${"1d 0h 0m 1s"}
    `(
      "returns $expected from $offset",
      async ({
        duration,
        expected,
      }: {
        duration: number;
        expected: string;
      }) => {
        render(<DurationDisplay duration={duration} />);

        await screen.findByText(expected);
      }
    );
  });
});
