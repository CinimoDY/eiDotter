import '@testing-library/jest-dom';

// Mock CSS modules and browser APIs for testing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).matchMedia = jest.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

// Mock ResizeObserver
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));