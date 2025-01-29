import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #6366f1;
    --primary-hover: #4f46e5;
    --bg-primary: #f9fafb;
    --text-primary: #111827;
    --text-secondary: #6b7280;
    --card-bg: #ffffff;
    --sidebar-bg: #ffffff;
    --header-bg: #ffffff;
    --border-color: #e5e7eb;
    --input-bg: #ffffff;
    --hover-bg: #f3f4f6;
    --error-color: #ef4444;
  }

  [data-theme='dark'] {
    --primary-color: #6366f1;
    --primary-hover: #4f46e5;
    --bg-primary: #111827;
    --text-primary: #f9fafb;
    --text-secondary: #9ca3af;
    --card-bg: #1f2937;
    --sidebar-bg: #1f2937;
    --header-bg: #1f2937;
    --border-color: #374151;
    --input-bg: #374151;
    --hover-bg: #374151;
    --error-color: #ef4444;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 1rem;
  }
`;
