import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("App", () => {
  it("routes from dialogue to memory lock and then to the calm aftermath", async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(screen.getByText("Shallow Truths")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Deflect with a practiced smile.",
      }),
    );

    expect(
      screen.getByText("Choose the feeling you decide to preserve."),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "I was calm." }));

    expect(
      screen.getByText(
        "You smooth the moment flat and call it composure. The lie settles into the archive like it belongs there.",
      ),
    ).toBeInTheDocument();
  });
});
