# Heart Beat User List

## Setup instructions

### Pre-requisites
- requires nvm v20 or above

## Project Overview
- **Name**: `heart-beat-users`
- **Homepage**: [GitHub Pages](https://ruhaim.github.io/heart-beat-react-ts/)

---

## Key Features

### Build & Development
- **Tooling**: Vite for fast development and build processes.
- **TypeScript Support**: Configured with TypeScript (version ~5.6.2).

### Code Quality
- **Linting**: ESLint configured for TypeScript and React.
- **Auto-fix**: Runs linting and fixing on staged files via `lint-staged` and Husky pre-commit hooks.

### Frontend Stack
- **UI Libraries**:
  - **Material-UI**: (`@mui/material`, `@mui/icons-material`).
  - **Emotion**: Styled-components support (`@emotion/react` and `@emotion/styled`).
- **Data Handling**:
  - Redux Toolkit (`@reduxjs/toolkit`, `react-redux`) for state management.
- **Form Management**:
  - Formik for form handling with Zod for schema validation.
- **Visualization**:
  - `@visx` for data visualization.

### Testing & Mocking
- MirageJS for mocking API requests during development.
- FakerJS for generating mock data.

---

## Scripts

| Script       | Description                                       |
|--------------|---------------------------------------------------|
| `dev`        | Runs the development server with Vite.            |
| `build`      | Builds the project with TypeScript and Vite.      |
| `lint`       | Lints TypeScript and JavaScript files.            |
| `lint:fix`   | Automatically fixes linting issues.               |
| `prepare`    | Installs Husky for pre-commit hooks.              |

---

## Development Dependencies

- **Linting & Code Quality**:
  - ESLint, `eslint-plugin-react-hooks`, `eslint-plugin-simple-import-sort`
  - Husky for pre-commit hooks
  - lint-staged for staged file management
- **Mocking & Testing**:
  - MirageJS for API mocking
  - FakerJS for mock data generation
- **TypeScript**: TypeScript ~5.6.2
- **Tooling**: Vite with `@vitejs/plugin-react`

---

## Conclusion

The project is a modern **React** and **TypeScript** application:
- **Vite** ensures fast performance.
- **Material-UI** and **Emotion** provide styling solutions.
- **Redux Toolkit** handles state management.
- Robust development workflows with **linting**, **testing**, and **pre-commit hooks** ensure code quality and maintainability.

