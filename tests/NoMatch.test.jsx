import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import NoMatch from "../src/components/NoMatch";

describe("NoMatch", () => {
  const AKON_URL = "https://youtu.be/6EEW-9NDM5k?si=bjkiywHlQUy6F7ad";
  let originalOpen;

  beforeAll(() => {
    originalOpen = window.open;
  });

  beforeEach(() => {
    window.open = vi.fn();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    window.open = originalOpen;
  });

  it("renders the no match message and Akon link", () => {
    render(<NoMatch onReset={() => {}} />);
    expect(screen.getByText("No Match Found")).toBeInTheDocument();
    expect(screen.getByText("Listen to Akon - Lonely")).toBeInTheDocument();
    expect(screen.getByText("Try Again")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /Listen to Akon/i });
    expect(link).toHaveAttribute("href", AKON_URL);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("calls onReset when Try Again button is clicked", () => {
    const onReset = vi.fn();
    render(<NoMatch onReset={onReset} />);
    const button = screen.getByRole("button", { name: /Try Again/i });
    fireEvent.click(button);
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it("auto-opens Akon link in new tab after 3 seconds", () => {
    render(<NoMatch onReset={() => {}} />);
    vi.advanceTimersByTime(3000); // This triggers the setTimeout
    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.open).toHaveBeenCalledWith(AKON_URL, "_blank");
  });
});
