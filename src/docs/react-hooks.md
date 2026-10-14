# Hooks in React — Comprehensive Notes

> **Purpose:**
>
> This document covers React Hooks — what they are, why they exist, and how the most important ones work. After reading it you will understand state, side effects, context, and custom hooks well enough to use them confidently and talk about them in an interview.

---

## Table of Contents

1. [What Are Hooks?](#1-what-are-hooks)
2. [useState](#2-usestate)
3. [useEffect](#3-useeffect)
4. [Context API and useContext](#4-context-api-and-usecontext)
5. [Custom Hooks](#5-custom-hooks)
6. [Rules of Hooks](#6-rules-of-hooks)
7. [Interview Questions & Answers](#7-interview-questions--answers)
8. [Quick Reference Checklist](#quick-reference-checklist)

---

## 1. What Are Hooks?

### Overview

Hooks are special functions React provides so that functional components can do everything class components could — manage state, run side effects, share logic — without writing a class. They were introduced in React 16.8.

### Key Points

- **Functional-component only:** Hooks can only be called inside functional components or other hooks, never in class components.
- **`use` prefix:** Every hook starts with `use`. This is a convention React enforces via linting.
- **Built-in vs custom:** React ships built-in hooks (`useState`, `useEffect`, `useContext`, etc.). You can also write your own.

---

## 2. useState

### Overview

`useState` is the hook that adds local state to a functional component. When state changes, React re-renders the component with the new value.

### Key Points

- **`const [value, setValue] = useState(initial)`:** Returns a pair — the current state value and a setter function.
- **Setter triggers re-render:** Calling `setValue` schedules a re-render. The new value is available on the next render.
- **Initial value runs once:** The argument to `useState` is only used on the first render.
- **State is per-component:** Each component instance has its own independent state.

### Example

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

### Important Rules

- **Never mutate state directly.** `state.value = 'new'` does not trigger a re-render. Always use the setter.
- **State updates are asynchronous.** Reading state immediately after calling the setter still returns the old value.

---

## 3. useEffect

### Overview

`useEffect` lets you perform side effects in functional components. Side effects are anything that reaches outside the component — fetching data, updating the DOM directly, setting up a timer or event listener.

### Key Points

- **Two arguments:** A function to run and an optional dependency array.
- **`[]` (empty array):** Effect runs once after the first render only — equivalent to `componentDidMount`.
- **`[dep1, dep2]`:** Effect re-runs whenever any listed dependency changes.
- **No array:** Effect runs after every render.
- **Cleanup function:** The effect can return a function. React calls this cleanup before running the effect again and when the component unmounts.

### Example

```jsx
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);

    return () => clearInterval(id); // cleanup: clears the interval on unmount or re-run
  }, []); // empty array → runs once on mount

  return <p>{seconds}s elapsed</p>;
}
```

### Important Rules

- **Cleanup order:** On re-renders, React runs the *previous* cleanup first, then the new effect. The very first render has no prior cleanup.
- **Do not put async functions directly in the effect callback.** Wrap the async call inside a named function defined inside the effect.

```jsx
useEffect(() => {
  async function fetchData() {
    const res = await fetch('/api/data');
    // ...
  }
  fetchData();
}, []);
```

---

## 4. Context API and useContext

### Overview

Context API is a way to pass data through the component tree without threading props down through every intermediate level. It is useful for values that many components need — current user, theme, locale.

### Key Points

- **`React.createContext(default)`:** Creates a context object with a default value.
- **`<Context.Provider value={...}>`:** Wraps the part of the tree that needs access. All descendants can read the value.
- **`useContext(Context)`:** The hook that reads the current context value inside a functional component.
- **Re-render on change:** Every component that calls `useContext` re-renders when the provider's `value` changes.

### Example

```jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light'); // default value

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const theme = useContext(ThemeContext); // reads 'dark' from the nearest provider
  return <button className={theme}>Click me</button>;
}
```

### Important Rules

- Context is not a replacement for all prop drilling. For data that only one or two levels deep need, props are simpler and easier to trace.

---

## 5. Custom Hooks

### Overview

A custom hook is a function whose name starts with `use` that calls one or more built-in hooks. They let you extract and reuse stateful logic across components without changing the component tree.

### Key Points

- **Just a function:** A custom hook has no special API — it is a plain JavaScript function that happens to call hooks inside it.
- **Logic, not UI:** Custom hooks share logic. They do not render anything.
- **Each call is independent:** Two components calling the same custom hook get their own separate state.

### Example

```jsx
import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // cleanup
  }, []);

  return width;
}

// Usage in any component:
function MyComponent() {
  const width = useWindowWidth();
  return <p>Window is {width}px wide</p>;
}
```

---

## 6. Rules of Hooks

### Overview

React relies on the order hooks are called to match state to the right hook on each render. Breaking the rules causes bugs that are hard to trace.

### Key Points

- **Only call hooks at the top level.** Never inside loops, conditions, or nested functions.
- **Only call hooks from React functions.** That means functional components and custom hooks — not plain JavaScript helpers.

### Important Rules

- If you need to run an effect conditionally, put the condition *inside* the effect, not around it.

```jsx
// Wrong — breaks rules
if (condition) {
  useEffect(() => { /* ... */ }, []);
}

// Correct — condition goes inside
useEffect(() => {
  if (condition) { /* ... */ }
}, [condition]);
```

---

## 7. Interview Questions & Answers

### Q1: What problem do hooks solve? Why were they introduced?

**Answer:**
Before hooks, stateful logic could only live in class components, which made it hard to reuse logic across components without adding wrapper layers (higher-order components, render props). Hooks let you extract stateful logic into a plain function and share it across many components without changing the component hierarchy.

---

### Q2: What is the dependency array in `useEffect` and what happens if you omit it?

**Answer:**
The dependency array tells React when to re-run the effect. If you pass `[]`, the effect runs once after the first render. If you pass `[a, b]`, it re-runs whenever `a` or `b` changes. If you omit the array entirely, the effect runs after *every* render — which usually causes unnecessary work or infinite loops if you update state inside it.

---

### Q3: When does the `useEffect` cleanup function run?

**Answer:**
The cleanup runs in two situations: just before the effect fires again (so the previous effect is cleaned up before the next one starts), and when the component unmounts. It does not run before the very first effect execution.

```jsx
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id); // runs on unmount, or before the next interval is set
}, []);
```

---

### Q4: What is the difference between `useState` and `useRef`?

**Answer:**
Both persist a value across renders, but only `useState` triggers a re-render when the value changes. `useRef` stores a mutable value in `.current` and changing it has no effect on the UI. Use `useState` for values the component should display; use `useRef` for values you need to track internally (e.g. a timer ID, a DOM node) without causing a re-render.

---

### Q5: Why can't you call a hook inside an `if` statement?

**Answer:**
React tracks which hook corresponds to which piece of state by the *order* they are called on each render. If a hook is inside a condition, it might not be called on some renders, which shifts the order of all subsequent hooks and causes React to assign state to the wrong hook. The ESLint plugin `eslint-plugin-react-hooks` enforces this rule at build time.

---

### Q6: What is `useContext` and when should you use it instead of props?

**Answer:**
`useContext` reads the nearest matching `Provider`'s value from anywhere in the tree, skipping all intermediate components. Use it when a value (theme, auth user, locale) is needed by many components at different nesting levels. Avoid it as a general state manager for data that changes frequently, because every `useContext` consumer re-renders when the value changes.

---

### Q7: What makes a custom hook different from a regular helper function?

**Answer:**
A custom hook calls other hooks inside it, which a plain function cannot do. Because it calls hooks, React can track its state and effects correctly. The `use` prefix is required — React and linters use it to know that the rules of hooks apply. A plain helper function that calls `useState` inside it would violate the rules and break at runtime.

---

### Q8: What is the danger of missing a dependency in a `useEffect` dependency array?

**Answer:**
The effect captures the values from the render it last ran on. If a dependency is missing, the effect closes over a stale version of that value and will never re-run when it changes — leading to bugs where the UI shows outdated data or the effect acts on the wrong value. The `eslint-plugin-react-hooks` exhaustive-deps rule warns about this automatically.

---

## Quick Reference Checklist

- [ ] `useState` setter is always called — state is never mutated directly
- [ ] `useEffect` has the correct dependency array — all values used inside the effect are listed
- [ ] Async logic inside `useEffect` is wrapped in an inner function, not on the effect callback itself
- [ ] Every `useEffect` that sets up a subscription, timer, or event listener returns a cleanup function
- [ ] No hooks are called inside loops, conditions, or nested functions
- [ ] Custom hooks start with `use`
- [ ] `useContext` is used for tree-wide values, not as a replacement for all state
