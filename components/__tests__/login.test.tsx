import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Auth from "../../app/(tabs)/(org)/login";
import { supabase } from "@/utils/supabase";
import { Alert } from "react-native";

// Mock expo-router to prevent navigation errors in test
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Keep the Supabase mock here
// For this test, we will define two mock implementations:
// 1) A successful signIn mock in the previous test
// 2) Now a failing signIn mock for this particular test
jest.mock("@/utils/supabase", () => ({
  supabase: {
    auth: {
      // We will override this mock's implementation in each test
      signInWithPassword: jest.fn(),
    },
  },
}));

// Mock Alert so we can check for alert calls
jest.spyOn(Alert, "alert");

describe("Auth component error handling", () => {
  it("shows an error alert when sign-in fails", async () => {
    // Override the mock to return an error this time
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValueOnce({
      error: { message: "Invalid credentials" },
    });

    const { getByPlaceholderText, getByText } = render(<Auth />);

    // Enter test credentials
    fireEvent.changeText(
      getByPlaceholderText("email@address.com"),
      "wrong@example.com"
    );
    fireEvent.changeText(getByPlaceholderText("Password"), "wrongpassword");

    // Press "Sign in"
    fireEvent.press(getByText("Sign in"));

    // Wait for signInWithPassword to be called
    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "wrong@example.com",
        password: "wrongpassword",
      });
    });

    // Check if Alert.alert was called with the error message
    expect(Alert.alert).toHaveBeenCalledWith("Invalid credentials");
  });
});
