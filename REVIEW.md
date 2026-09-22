# Frontend Code Review

## Performance

**Issue: Uncontrolled Re-renders in Activity Feed**

- **What is wrong:** The `ActivityPage` utilizes a `setInterval` within a `useEffect` to increment a `tick` state every 1.4 seconds, causing the entire page to re-render continuously.
- **Why it matters:** This completely degrades browser performance, unnecessarily consumes CPU cycles, drains battery on mobile devices, and can cause severe UI stuttering, especially as the DOM grows.
- **Suggested improvement:** Remove the `setInterval` logic entirely. React state should only update reactively when the underlying data or user input actually changes.

**Issue: Redundant and Inefficient Filtering Logic**

- **What is wrong:** In `ActivityPage`, there are two almost identical filtering functions (`applyFilterA` and `applyFilterB`) that run sequentially on every state change or "tick".
- **Why it matters:** This doubles the time complexity (O(N)) for processing the activity array. As the activity log grows, synchronous heavy computations on the main thread will cause the app to freeze or become unresponsive.
- **Suggested improvement:** Consolidate the filtering logic into a single function and memoize the result using `useMemo`, ensuring it only recalculates when the search `query` or the `allActivity` array changes.

## Maintainability

**Issue: Severe State Duplication**

- **What is wrong:** The `ActivityPage` maintains three separate state variables (`allActivity`, `shownActivity`, `forcedList`) to manage and display the exact same dataset.
- **Why it matters:** Duplicating state violates the "Single Source of Truth" principle in React. It makes the component incredibly hard to debug, error-prone, and causes sync issues between the original and derived data.
- **Suggested improvement:** Store only the raw `allActivity` and the search `query` in the state. Derive the filtered list dynamically during rendering using `useMemo`.

## Code Quality & React Best Practices

**Issue: Direct API Calls Inside UI Components**

- **What is wrong:** The `ActivityPage` uses a raw `fetch()` call inside a `useEffect` directly in the component, whereas the Tasks module correctly uses an abstraction layer (`lib/backendApi.ts`) and custom hooks.
- **Why it matters:** It creates inconsistent architecture, scatters API logic across the UI components, makes error handling inconsistent, and makes the component harder to test.
- **Suggested improvement:** Extract the data-fetching and filtering logic into a dedicated custom hook (e.g., `hooks/useActivity.ts`) to separate concerns and mirror the clean architecture used in `hooks/useTasks.ts`.

**Issue: Redundant Formatting Functions**

- **What is wrong:** `ActivityPage` declares two identical functions (`formatTimeA` and `formatTimeB`) to format dates.
- **Why it matters:** It violates the DRY (Don't Repeat Yourself) principle and adds unnecessary bloat to the component body.
- **Suggested improvement:** Remove both functions and define a single reusable date-formatting utility outside the component body (or inline if it's a simple `toLocaleString` call).

## UX Issues

**Issue: Missing System Feedback (Loading & Error States)**

- **What is wrong:** When fetching activity data, the user sees a blank list. If the fetch fails, the state is silently set to empty arrays without any visual feedback.
- **Why it matters:** A core principle of UX is "Visibility of System Status." Users won't know if the application is broken, still loading data, or if the list is genuinely empty.
- **Suggested improvement:** Introduce `loading` and `error` states. Display a clear loading indicator (like a spinner or skeleton loader) and an error message with a "Retry" button if the API request fails (similar to the Task Dashboard).

**Issue: Cluttered and Redundant UI Elements**

- **What is wrong:** The activity items display the exact same timestamp twice per item.
- **Why it matters:** It clutters the UI with duplicate information, reducing readability and taking up unnecessary vertical space.
- **Suggested improvement:** Render the formatted timestamp only once per activity item.
