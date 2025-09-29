# Frontend Guidelines Document for LLM Comparator

This document outlines the architecture, design principles, styling, component structure, state management, routing, performance optimizations, and testing strategies for the LLM Comparator frontend. It’s written in everyday language to make it easy to understand.

## 1. Frontend Architecture

**Framework and Libraries**
- We use **Next.js (v13+)** with the **App Router** for our core framework. Next.js gives us file-based routing, server-side rendering (SSR), static generation, and API routes all in one.
- **React** powers our UI components, and **TypeScript** adds static typing to catch errors early.
- Docker Dev Containers (in the `.devcontainer` folder) ensure everyone on the team has the same development setup.

**Scalability, Maintainability, Performance**
- File-based routing and API routes keep code organized by feature, making it easy to add new pages or APIs.
- Component-based design keeps UI pieces small and reusable, which helps when the app grows.
- Server components in Next.js reduce the amount of JavaScript sent to the browser, speeding things up.
- TypeScript’s static checks reduce runtime errors and improve refactoring safety.

## 2. Design Principles

**Key Principles**
- **Usability:** Simple and intuitive layouts, clear labels, and easy-to-find actions.
- **Accessibility:** Semantic HTML, ARIA roles where needed, keyboard navigation, and high-contrast text.
- **Responsiveness:** Mobile-first design, fluid layouts, and breakpoints for tablets and desktops.

**Application in UI**
- Forms and buttons use clear focus states and labels.
- Color contrasts meet WCAG AA standards.
- Layouts adapt gracefully from small to large screens using CSS Grid and Flexbox.

## 3. Styling and Theming

**Styling Approach**
- We use **Tailwind CSS** for utility-first styling and **PostCSS** (built into Next.js) for processing. Tailwind keeps our CSS footprint small and consistent.
- For occasional custom styles, we use **CSS Modules** alongside global Tailwind utilities.

**Theming**
- A single theme file (`src/styles/theme.css`) holds CSS variables for colors and spacing.
- Dark mode can be toggled by adding a `dark` class to the `<html>` tag.

**Visual Style**
- Modern, flat design with subtle **glassmorphism** cards (translucent backgrounds and soft shadows).

**Color Palette**
- `--color-primary: #4F46E5` (indigo)
- `--color-secondary: #10B981` (emerald)
- `--color-background: #F9FAFB` (light gray)
- `--color-surface: #FFFFFF` (white)
- `--color-text: #111827` (dark gray)
- Glass card background: `rgba(255, 255, 255, 0.2)`

**Font**
- We use **Inter**, a clean and modern sans-serif. It pairs well with our flat/glass style.

## 4. Component Structure

**Organization**
- All components live under `src/components/`, grouped by feature (e.g., `Chat`, `ModelSelector`, `Layout`).
- File naming uses **PascalCase** for component files (e.g., `ResponseCard.tsx`).

**Reusability and Consistency**
- Each component has a clear API (props) and minimal internal state.
- Shared UI elements (buttons, inputs) live in `src/components/ui/` for reuse across pages.
- We avoid duplicated code by extracting repeated patterns into small, focused components.

## 5. State Management

**Approach**
- We use **React Context** combined with **useReducer** for global state (e.g., chat history, selected models).
- Local, component-specific state uses **useState**.

**Why It Works**
- Context + useReducer is lightweight and avoids pulling in a large library.
- It keeps related state logic in one place and makes it easy to add new actions or reducers.

## 6. Routing and Navigation

**Routing**
- Next.js’s **App Router** gives us file-based routing in `src/app/`. Create a folder named after the route and add a `page.tsx` file to define that page.
- API routes live in `src/app/api/` (e.g., `src/app/api/chat/route.ts`).

**Navigation**
- We use Next.js’s `<Link>` component for client-side transitions.
- A shared `Layout` component includes a header and footer and wraps all pages.

## 7. Performance Optimization

**Lazy Loading & Code Splitting**
- Dynamic imports (`next/dynamic`) for heavy components like charts or large libraries.
- Server components in Next.js reduce client bundle size.

**Asset Optimization**
- Next.js’s built-in `<Image>` component optimizes images automatically.
- Tailwind’s purge feature removes unused CSS from production builds.

**Caching & Data Fetching**
- Use Next.js’s built-in caching for API routes (ISR or revalidation).
- Client-side data caching can use React Query or simple in-memory caches if needed.

## 8. Testing and Quality Assurance

**Unit Tests**
- **Jest** + **React Testing Library** for components and utility functions.

**Integration Tests**
- Test API routes with **supertest** or Next.js’s testing utilities to ensure correct request/response behavior.

**End-to-End Tests**
- **Cypress** for full user flows (entering a prompt, comparing responses, error states).

**Linting & Formatting**
- **ESLint** with Next.js and TypeScript plugins.
- **Prettier** for consistent code formatting.
- A pre-commit hook (Husky) runs lint and tests before allowing commits.

## 9. Conclusion and Overall Frontend Summary

We’ve built a clean, modern, and scalable frontend using Next.js, React, and TypeScript. Our component-based approach, combined with Tailwind CSS and React Context, ensures maintainability and quick iteration. Performance optimizations like server components and lazy loading keep the app snappy, and our comprehensive testing strategy guarantees reliability. These guidelines align with our goal of providing users with a seamless way to compare LLM outputs and give developers a predictable, easy-to-follow structure for future enhancements.