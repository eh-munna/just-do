# React Fundamentals — Comprehensive Notes

> **Purpose:**
>
> This document covers React's core concepts — what React is, why developers choose it, how its rendering pipeline works (virtual DOM, reconciliation, reconciler), and what components are. Includes examples and interview-level Q&A.

---

## Table of Contents

1. [What Is React](#1-what-is-react)
2. [Why Use React](#2-why-use-react)
3. [Virtual DOM](#3-virtual-dom)
4. [Reconciliation](#4-reconciliation)
5. [React Reconciler](#5-react-reconciler)
6. [Components](#6-components)
7. [Interview Questions & Answers](#7-interview-questions--answers)
8. [Quick Reference Checklist](#quick-reference-checklist)

---

## 1. What Is React

### Overview

React is a JavaScript library for building user interfaces. It uses a declarative paradigm that makes it easy to reason about your code and easier to learn.

### Key Points

- **Declarative**: You describe _what_ the UI should look like for a given state, and React figures out _how_ to update the DOM.
- **Component-based**: UIs are built from small, reusable pieces called components.
- **Library, not framework**: React handles the view layer only. Routing, state management, and data fetching are left to you or third-party libraries.
- **JSX**: React uses JSX — a syntax extension that lets you write HTML-like markup inside JavaScript.

### Example

```jsx
import { createRoot } from 'react-dom/client';

function App() {
  return <h1>Hello, React!</h1>;
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

---

## 2. Why Use React

### Overview

React solves the pain of keeping the DOM in sync with application state. Instead of manually finding and updating DOM elements, you declare how the UI should look and React handles the rest.

### Key Points

- **Efficient updates**: React's virtual DOM diffing avoids unnecessary real DOM manipulations, which are expensive.
- **Reusable components**: Build a component once, use it anywhere — across pages or even across projects.
- **Large ecosystem**: Huge community, mature tooling (React DevTools, Next.js, Vite), and abundant libraries.
- **One-way data flow**: Data flows from parent to child via props, making bugs easier to trace.
- **Learn once, write anywhere**: The same mental model powers React DOM (web), React Native (mobile), and other renderers.

---

## 3. Virtual DOM

### Overview

The virtual DOM is a lightweight, in-memory JavaScript representation of the real DOM. When state changes, React builds a new virtual DOM tree, diffs it against the previous one, and applies only the minimal set of changes to the real DOM.

### Key Points

- **Plain objects**: Virtual DOM nodes are regular JavaScript objects describing the element type, props, and children.
- **Cheap to create**: Creating JS objects is far cheaper than creating real DOM nodes.
- **Batched updates**: React batches multiple state changes and performs a single DOM update pass.

### Example

```jsx
// JSX compiles to virtual DOM objects via React.createElement
const element = <h1 className="title">Hello</h1>;

// Equivalent virtual DOM object:
// { type: 'h1', props: { className: 'title', children: 'Hello' } }
```

---

## 4. Reconciliation

### Overview

Reconciliation is the process of comparing the _previous_ virtual DOM tree with the _new_ virtual DOM tree to determine the minimum set of changes needed to update the real DOM.

### Key Points

- **Diffing algorithm**: React compares trees top-down. If two elements have different types, React tears down the old subtree and builds a new one.
- **Keys**: When rendering lists, `key` props help React identify which items changed, were added, or removed — without keys, React re-renders the entire list.
- **O(n) heuristic**: A general tree diff is O(n³). React uses two heuristics to achieve O(n): elements of different types produce different trees, and `key` props signal stable identity.

### Example

```jsx
function TodoList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        // key lets React track each item across re-renders
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}
```

### Important Rules

- Never use array index as `key` if items can be reordered, added, or removed — it leads to subtle bugs and lost component state.
- Keys must be stable, unique among siblings, and predictable (not random per render).

---

## 5. React Reconciler

### Overview

The reconciler is the internal algorithm within React that takes the virtual DOM representation of your application and determines what changes to apply to the host environment (browser DOM, native views, etc.).

### Key Points

- **Fiber architecture**: Since React 16, the reconciler uses a "Fiber" data structure that allows work to be split into small units and paused/resumed — enabling concurrent features.
- **Renderer-agnostic**: The reconciler calculates _what_ changed; a separate renderer (`react-dom`, `react-native`) applies those changes to the target platform.
- **Prioritised updates**: Fiber lets React prioritise urgent updates (e.g., user input) over less urgent ones (e.g., off-screen content).

---

## 6. Components

### Overview

A component is a JavaScript function that accepts props (inputs) and returns React elements describing what should appear on screen.

### Key Points

- **Function components**: The standard way to write components. They are plain functions that return JSX.
- **Props**: Read-only inputs passed from parent to child.
- **State**: Internal data managed by a component using hooks like `useState`.
- **Composition**: Components can contain other components, enabling complex UIs from simple building blocks.

### Example

```jsx
function Greeting({ name }) {
  return <p>Hello, {name}!</p>;
}

function App() {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </div>
  );
}
```

### Important Rules

- Component names must start with a capital letter — lowercase names are treated as HTML tags.
- Components must return a single root element (or use a Fragment `<>...</>`).
- Never mutate props inside a component.

---

## 7. Interview Questions & Answers

### Q1: What is the virtual DOM and why does React use it?

**Answer:**
The virtual DOM is an in-memory JavaScript object tree that mirrors the structure of the real DOM. React uses it because directly manipulating the real DOM is slow. By diffing two virtual DOM trees and computing the minimal set of changes, React avoids unnecessary DOM operations and batches updates efficiently.

---

### Q2: What is the difference between reconciliation and rendering?

**Answer:**
Reconciliation is the _diffing_ phase — React compares the old and new virtual DOM trees to figure out what changed. Rendering is the _commit_ phase — applying those changes to the actual DOM (or native views). They are separate concerns: the reconciler is platform-agnostic, while the renderer is platform-specific.

---

### Q3: Why are keys important when rendering lists?

**Answer:**
Keys give each list item a stable identity across re-renders. Without keys, React cannot tell which items moved, were added, or removed — so it may destroy and recreate components unnecessarily, losing internal state (like form input values). Keys should be unique, stable identifiers like database IDs, not array indices.

**Example:**

```jsx
// Bad — index keys cause issues when items reorder
items.map((item, i) => <li key={i}>{item.text}</li>);

// Good — stable unique key
items.map((item) => <li key={item.id}>{item.text}</li>);
```

---

### Q4: What makes React "declarative"?

**Answer:**
In a declarative model, you describe the desired end-state of the UI for each piece of data, and the framework figures out how to transition the DOM to match. You never write `document.getElementById(...).innerHTML = ...`. Instead, you return JSX from a component and React handles the DOM updates. This makes code more predictable and easier to debug.

---

### Q5: What is the difference between props and state?

**Answer:**
Props are read-only values passed from a parent component to a child — the child cannot modify them. State is internal data owned and managed by the component itself using `useState`. When state changes, the component re-renders. Props flow down; state is local.

**Example:**

```jsx
function Counter({ label }) {
  // label is a prop (read-only, from parent)
  // count is state (local, mutable via setCount)
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {label}: {count}
    </button>
  );
}
```

---

### Q6: Why must component names start with a capital letter?

**Answer:**
JSX uses the casing of the tag name to decide whether it refers to a custom component or a built-in HTML element. `<div>` compiles to `React.createElement('div')` (a string), while `<MyComponent>` compiles to `React.createElement(MyComponent)` (a reference). A lowercase custom component would be treated as an unknown HTML tag and rendered as an empty element.

---

### Q7: What is React Fiber and what problem does it solve?

**Answer:**
Fiber is React's reconciliation algorithm introduced in React 16. The old (stack-based) reconciler processed the entire tree synchronously, which could block the main thread and make the UI unresponsive during large updates. Fiber breaks rendering work into small units that can be paused, prioritised, and resumed — enabling features like concurrent rendering and Suspense.

---

## Quick Reference Checklist

- [ ] Components are function components (not class components for new code)
- [ ] Component names start with a capital letter
- [ ] Every list item has a stable, unique `key` prop (not array index)
- [ ] Props are never mutated inside a component
- [ ] State updates use the setter from `useState`, not direct mutation
- [ ] Each component returns a single root element (or Fragment)
- [ ] Side effects go in `useEffect`, not in the render body
