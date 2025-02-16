import "@testing-library/jest-dom";

// Mock window.alert
window.alert = jest.fn();

// Mock window.location
const mockLocation = {
  href: "",
};

Object.defineProperty(window, "location", {
  value: mockLocation,
  writable: true,
});

// Suppress console.error
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    (args[0].includes("act(") || args[0].includes("회원가입 오류"))
  ) {
    return;
  }
  originalError.call(console, ...args);
};

// Clear mocks after each test
afterEach(() => {
  jest.clearAllMocks();
  window.location.href = "";
});

export {};
