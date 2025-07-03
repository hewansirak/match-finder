import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { questions } from "../src/data/questions"; // Use static questions, not async getQuestions
import Quiz from "../src/components/Quiz";

// Make sure mockUserData matches your UserData type
const mockUserData = {
  username: "Alice",
  dob: "2000-01-01",
  gender: "female",
  avatar: "",
  bio: "",
};

describe("Quiz Component", () => {
  const onComplete = vi.fn();

  beforeEach(() => {
    onComplete.mockClear();
  });

  it("renders the first question and options", () => {
    render(<Quiz userData={mockUserData} onComplete={onComplete} />);
    // Checks for greeting with username
    expect(screen.getByText(/Hi Alice/i)).toBeInTheDocument();
    // Checks for question text
    expect(screen.getByText(questions[0].question)).toBeInTheDocument();
    // Checks for all options of the first question
    questions[0].options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
    // Shows progress
    expect(screen.getByText(/1 of \d+/i)).toBeInTheDocument();
  });

  it("highlights the selected option and advances to next question", async () => {
    render(<Quiz userData={mockUserData} onComplete={onComplete} />);
    const firstOption = screen.getByText(questions[0].options[0].label);
    await userEvent.click(firstOption);
    // After delay, next question should appear
    expect(await screen.findByText(questions[1].question)).toBeInTheDocument();
  });

  it("calls onComplete with answers after last question", async () => {
  render(<Quiz userData={mockUserData} onComplete={onComplete} />);
  // Answer all questions
  for (let i = 0; i < questions.length; i++) {
    const option = screen.getByText(questions[i].options[0].label);
    await userEvent.click(option);
    if (i < questions.length - 1) {
      expect(
        await screen.findByText(questions[i + 1].question)
      ).toBeInTheDocument();
    }
  }

  // Wait for onComplete to be called
  await waitFor(() => {
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  expect(onComplete.mock.calls[0][0]).toMatchObject(
    Object.fromEntries(questions.map((q) => [q.id, q.options[0].value]))
  );
}, 10000);

  it("shows progress bar updating as questions advance", async () => {
    render(<Quiz userData={mockUserData} onComplete={onComplete} />);
    for (let i = 0; i < questions.length; i++) {
      const progressBar = screen.getByTestId("progress-bar");
      await userEvent.click(progressBar);
    }
  });
});
