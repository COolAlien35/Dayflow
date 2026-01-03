// Jest setup file
require('@testing-library/jest-dom');

// Mock window.matchMedia for accessibility tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock window.scrollTo for scroll tests
window.scrollTo = jest.fn();

// Mock requestAnimationFrame for GSAP
global.requestAnimationFrame = (cb) => {
  return setTimeout(cb, 0);
};

global.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};
