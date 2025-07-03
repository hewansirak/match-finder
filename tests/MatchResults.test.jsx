import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

// Mock dateUtils
vi.mock("../src/utils/dateUtils", () => ({
  calculateAge: vi.fn(() => 25),
  calculateZodiacSign: vi.fn(() => "Gemini"),
}));

// Mock findBestMatch
vi.mock("../src/lib/match", () => ({
  findBestMatch: vi.fn(),
}));

// Mock supabase
vi.mock("../src/lib/supabaseClient", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  },
}));

// Import after mocks
import MatchResults from "../src/components/MatchResults";
import { findBestMatch } from "../src/lib/match";
import { supabase } from "../src/lib/supabaseClient";

const mockUserData = {
  id: "1",
  username: "Alice",
  dob: "2000-01-01",
  gender: "female",
  avatar: "",
  bio: "",
};

const mockMatchedUser = {
  id: "2",
  username: "Bob",
  dob: "1998-05-05",
  gender: "male",
  avatar: "",
  bio: "",
};

describe("MatchResults", () => {
  const onReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state initially", async () => {
    (findBestMatch).mockImplementation(() => new Promise(() => {}));
    render(<MatchResults userData={mockUserData} quizAnswers={{}} onReset={onReset} />);
    expect(screen.getByText(/Finding your perfect match/i)).toBeInTheDocument();
    expect(screen.queryByTestId("profile-card")).not.toBeInTheDocument();
  });

  it("shows no match found if findBestMatch returns null", async () => {
    (findBestMatch).mockResolvedValue(null);
    render(<MatchResults userData={mockUserData} quizAnswers={{}} onReset={onReset} />);
    expect(await screen.findByText(/No Match Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Try Again/i)).toBeInTheDocument();
  });

  it("shows no match found if Supabase returns error", async () => {
    (findBestMatch).mockResolvedValue({ match_id: "2", match_count: 7 });
    // @ts-ignore
    supabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: "error" } });
    render(<MatchResults userData={mockUserData} quizAnswers={{}} onReset={onReset} />);
    expect(await screen.findByText(/No Match Found/i)).toBeInTheDocument();
  });

  it("calls onReset when 'Try Again' is clicked in no match state", async () => {
    (findBestMatch).mockResolvedValue(null);
    render(<MatchResults userData={mockUserData} quizAnswers={{}} onReset={onReset} />);
    const btn = await screen.findByText(/Try Again/i);
    await userEvent.click(btn);
    expect(onReset).toHaveBeenCalled();
  });
});
