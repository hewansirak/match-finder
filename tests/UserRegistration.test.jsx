import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import UserRegistration from "../src/components/UserRegistration";
import React from "react";

// Mock supabase insert
vi.mock("../src/lib/supabaseClient", () => ({
  supabase: {
    from: () => ({
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: {
              id: 123, // or any dummy id
              username: "Alice",
              dob: new Date("2000-01-01").toISOString(),
              gender: "female",
              avatar: null,
              bio: null,
            },
            error: null,
          }),
        }),
      }),
    }),
  },
}));


describe("UserRegistration UI", () => {
  let onComplete

  beforeEach(() => {
    onComplete = vi.fn();
    render(<UserRegistration onComplete={onComplete} />);
  });

  it("renders the gradient background", () => {
    const gradientDiv = document.querySelector(".bg-gradient-to-br");
    expect(gradientDiv).toBeTruthy();
    expect(gradientDiv).toHaveClass(
      "bg-gradient-to-br",
      "from-pink-50",
      "via-rose-50",
      "to-red-50"
    );
  });

  it("renders all form fields and labels", () => {
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose Your Avatar/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/About You/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Find My Match/i })).toBeInTheDocument();
  });

  it("renders 10 avatar emoji options", () => {
    const emojiButtons = screen.getAllByTestId("avatar-emoji");
    expect(emojiButtons.length).toBe(10);
  });

  it("selects an avatar emoji and highlights it", () => {
    const emojiButton = screen.getByRole("button", { name: "🦄" });
    fireEvent.click(emojiButton);
    expect(emojiButton).toHaveClass("bg-gradient-to-br", "from-pink-400", "to-rose-500");
  });

  it("shows focus styling on input fields", () => {
    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    fireEvent.focus(nameInput);
    expect(nameInput.className).toMatch(/border-pink-400/);
    fireEvent.blur(nameInput);
    expect(nameInput.className).not.toMatch(/border-pink-400/);
  });

  it("shows focus styling on gender select", () => {
    const genderSelect = screen.getByLabelText(/Gender/i);
    fireEvent.focus(genderSelect);
    expect(genderSelect.className).toMatch(/border-pink-400/);
    fireEvent.blur(genderSelect);
    expect(genderSelect.className).not.toMatch(/border-pink-400/);
  });

  it("does not submit the form if required fields are missing", async () => {
    fireEvent.click(screen.getByRole("button", { name: /Find My Match/i }));
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("submits the form with required fields", async () => {
    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    const dobInput = screen.getByLabelText(/Date of Birth/i);
    const genderSelect = screen.getByLabelText(/Gender/i);

    fireEvent.change(nameInput, { target: { value: "Alice" } });
    fireEvent.change(dobInput, { target: { value: "2000-01-01" } });
    fireEvent.change(genderSelect, { target: { value: "female" } });

    fireEvent.click(screen.getByRole("button", { name: /Find My Match/i }));

    // Wait for async
    await new Promise(r => setTimeout(r, 0));

    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "Alice",
        dob: new Date("2000-01-01"),
        gender: "female",
        avatar: undefined,
        bio: undefined,
      })
    );
  });

  it("submits the form with optional fields (avatar, bio)", async () => {
    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    const dobInput = screen.getByLabelText(/Date of Birth/i);
    const genderSelect = screen.getByLabelText(/Gender/i);
    const bioTextarea = screen.getByPlaceholderText(/Tell us about yourself/i);
    const emojiButton = screen.getByRole("button", { name: "🦄" });

    fireEvent.change(nameInput, { target: { value: "Bob" } });
    fireEvent.change(dobInput, { target: { value: "1995-05-05" } });
    fireEvent.change(genderSelect, { target: { value: "male" } });
    fireEvent.click(emojiButton);
    fireEvent.change(bioTextarea, { target: { value: "I love coding!" } });

    fireEvent.click(screen.getByRole("button", { name: /Find My Match/i }));

    await new Promise(r => setTimeout(r, 0));

    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "Bob",
        dob: new Date("1995-05-05"),
        gender: "male",
        avatar: "🦄",
        bio: "I love coding!",
      })
    );
  });

  it("shows the correct character count in bio", () => {
    const bioTextarea = screen.getByPlaceholderText(/Tell us about yourself/i);
    fireEvent.change(bioTextarea, { target: { value: "Hello world" } });
    expect(screen.getByText("11/200")).toBeInTheDocument();
  });

  it("renders the decorative header and footer", () => {
    expect(screen.getByText(/Find Your Match/i)).toBeInTheDocument();
    expect(screen.getByText(/Inspired by Mister Samuel Balcha/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("lucide-heart").length).toBeGreaterThanOrEqual(2);
  });
});
