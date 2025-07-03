import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Quiz from "../src/components/Quiz";

vi.mock("../src/lib/api", () => {
  const mockQuestions = [
    {
      id: "q1",
      text: "What's your favorite color?",
      options: [
        { id: "o1", label: "Red", icon: "🟥" },
        { id: "o2", label: "Blue", icon: "🟦" },
      ],
    },
    {
      id: "q2",
      text: "Pick a pet:",
      options: [
        { id: "o3", label: "Dog", icon: "🐶" },
        { id: "o4", label: "Cat", icon: "🐱" },
      ],
    },
  ];
  return {
    getQuestions: vi.fn().mockResolvedValue(mockQuestions),
    saveUserAnswers: vi.fn().mockResolvedValue({}),
  };
});

// Now import after the mock
describe("Quiz Component", () => {
  const onComplete = vi.fn();
  const userId = "user-123";

  beforeEach(() => {
    onComplete.mockClear();
  });

  it("renders the first question and options", async () => {
    render(<Quiz userId={userId} onComplete={onComplete} />);
    // Wait for loading to finish
    expect(screen.getByText(/Loading questions/i)).toBeInTheDocument();
    expect(
      await screen.findByText("What's your favorite color?")
    ).toBeInTheDocument();
    expect(screen.getByText("Red")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.getByText(/1 of 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Hi! 👋/i)).toBeInTheDocument();
  });

  it("highlights the selected option and advances to next question", async () => {
    render(<Quiz userId={userId} onComplete={onComplete} />);
    expect(
      await screen.findByText("What's your favorite color?")
    ).toBeInTheDocument();
    const firstOption = screen.getByText("Red");
    await userEvent.click(firstOption);
    expect(await screen.findByText("Pick a pet:")).toBeInTheDocument();
  });

  it("calls onComplete with answers after last question", async () => {
    render(<Quiz userId={userId} onComplete={onComplete} />);
    await userEvent.click(await screen.findByText("Red"));
    await userEvent.click(await screen.findByText("Dog"));
    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledTimes(1);
    });
    expect(onComplete.mock.calls[0][0]).toMatchObject({
      q1: "o1",
      q2: "o3",
    });
  });

  it("shows progress bar updating as questions advance", async () => {
    render(<Quiz userId={userId} onComplete={onComplete} />);
    expect(
      await screen.findByText("What's your favorite color?")
    ).toBeInTheDocument();
    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar.style.width).toBe("50%");
    await userEvent.click(screen.getByText("Red"));
    expect(await screen.findByText("Pick a pet:")).toBeInTheDocument();
    const progressBar2 = screen.getByTestId("progress-bar");
    expect(progressBar2.style.width).toBe("100%");
  });
});
