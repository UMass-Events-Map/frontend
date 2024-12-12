import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Auth from "../../app/(tabs)/(org)/login";
import { supabase } from "@/utils/supabase";

// Mock expo-router to provide a stable router object for tests
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(), // mock the push method so it doesn't throw
  }),
}));

// Keep the Supabase mock in the test file
jest.mock("@/utils/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn().mockResolvedValue({ error: null }),
    },
  },
}));

describe("Auth component", () => {
  it("calls signInWithPassword with the entered email and password on sign in", async () => {
    const { getByPlaceholderText, getByText } = render(<Auth />);

    // Enter test credentials
    fireEvent.changeText(
      getByPlaceholderText("email@address.com"),
      "test@example.com"
    );
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");

    // Press "Sign in"
    fireEvent.press(getByText("Sign in"));

    // Wait for signInWithPassword to be called with correct credentials
    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });
});
