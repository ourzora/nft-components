import { render, screen } from "@testing-library/react";
import { CountdownDisplay } from "../../src/components/CountdownDisplay";

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
  `(
    "returns $expected from $offset",
    async ({ offset, expected }: { offset: number; expected: string }) => {
      // TODO(iain): Update the offset to be 0 (instead of 1 which gets cast to 0)
      render(<CountdownDisplay from={1} to={offset + 1} />);

      await screen.findByText(expected);
    }
  );
});
