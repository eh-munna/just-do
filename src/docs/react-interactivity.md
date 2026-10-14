# Interactivity in React — Comprehensive Notes

> **Purpose:**
>
> This document covers how React handles user interaction — event handling, state, controlled inputs, and common UI patterns. After reading it you will know how to respond to user actions, manage changing data, and wire up forms and toggles correctly.

---

## Table of Contents

1. [Event Handling in React](#1-event-handling-in-react)
2. [State in React](#2-state-in-react)
3. [Updating State](#3-updating-state)
4. [Controlled Components](#4-controlled-components)
5. [Common Interaction Patterns](#5-common-interaction-patterns)
6. [Interview Questions & Answers](#6-interview-questions--answers)

---

## 1. Event Handling in React

### Overview

Event handling in React is done using event handlers. Event handlers are functions that are called when an event occurs in the user interface. React wraps native browser events in a `SyntheticEvent` object so the API works the same way across all browsers.

### Key Points

- **Camel-case names**: React uses `onClick`, `onChange`, `onSubmit` — not `onclick` or `onchange`.
- **Pass a function reference**: write `onClick={handleClick}`, not `onClick={handleClick()}`. Calling it immediately runs it on render, not on click.
- **`SyntheticEvent`**: the event object passed to your handler. It has the same shape as a native DOM event (`event.target`, `event.preventDefault()`, etc.).
- **Inline arrow functions**: `onClick={() => doSomething(id)}` is fine for passing arguments, but creates a new function on every render — acceptable for most cases.

### Example

```jsx
function Button() {
  function handleClick(event) {
    event.preventDefault(); // stops default browser behaviour if inside a form
    console.log('clicked');
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

---

## 2. State in React

### Overview

State in React is a way to manage the state of a component. It is used to store data that can change over time. When state changes, React re-renders the component so the UI stays in sync with the data.

### Key Points

- **`useState`**: the Hook for adding state to a function component. Returns a value and a setter: `const [count, setCount] = useState(0)`.
- **Initial value**: the argument passed to `useState` is only used on the first render.
- **Re-render trigger**: calling the setter schedules a re-render. Reading the state variable always gives you the value from the current render.
- **Each component owns its state**: two instances of the same component have separate state.

### Example

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // starts at 0

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## 3. Updating State

### Overview

State updates in React are not immediate — they are scheduled. React may batch multiple `setState` calls together for performance. Understanding how updates work prevents bugs where you read stale state.

### Key Points

- **State is a snapshot**: the state value in an event handler is fixed for that render. Multiple calls to `setCount(count + 1)` in the same handler all read the same `count`.
- **Functional update form**: pass a function to the setter — `setCount(prev => prev + 1)` — to always work from the latest value. Use this when the new value depends on the old one.
- **Do not mutate state directly**: always replace, never mutate. For arrays: `setItems([...items, newItem])`. For objects: `setUser({ ...user, name: "new" })`.
- **Batching**: React batches state updates inside event handlers. Each update does not trigger a separate re-render.

### Example

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function incrementTwice() {
    // Both reads see the same `count` — result: +1, not +2
    setCount(count + 1);
    setCount(count + 1);
  }

  function incrementTwiceCorrectly() {
    // Functional form reads the latest queued value — result: +2
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  }

  return <button onClick={incrementTwiceCorrectly}>{count}</button>;
}
```

### Important Rules

- Never write `state.value = newValue` — this mutates the object without telling React, so no re-render occurs.
- Use the functional update form whenever the next value depends on the previous one.

---

## 4. Controlled Components

### Overview

A controlled component is an input element whose value is driven by React state. React becomes the single source of truth for the input's value, giving you full control over what the user can type and how the UI reacts to it.

### Key Points

- **`value` + `onChange`**: set `value={state}` and update state in `onChange`. Without `onChange`, the input becomes read-only.
- **`defaultValue`**: an uncontrolled alternative — sets the initial value but lets the DOM own it after that. Use this only when you do not need to track the value in state.
- **Why controlled**: lets you validate on every keystroke, format input, enable/disable submit buttons based on form content, and keep form values in sync with the rest of your app state.

### Example

```jsx
function NameInput() {
  const [name, setName] = useState('');

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)} // e.target.value is the new input text
        placeholder="Enter your name"
      />
      <p>Hello, {name}</p>
    </div>
  );
}
```

### Important Rules

- Never mix `value` (controlled) with no `onChange` — React will warn and the input will freeze.
- For checkboxes use `checked` instead of `value`.

---

## 5. Common Interaction Patterns

### Overview

Most interactive UIs are built from a small set of recurring patterns: toggling visibility, handling form submission, and responding to list actions. Knowing the pattern means you do not have to reinvent the solution each time.

### Key Points

- **Toggle**: `setState(prev => !prev)` flips a boolean. Use for show/hide, open/close, on/off.
- **Form submission**: handle `onSubmit` on the `<form>`, call `event.preventDefault()` to stop the page reload, then read the controlled state values.
- **List updates**: to remove an item use `.filter`; to update one item use `.map` and replace the matching element.

### Example

```jsx
function TodoList() {
  const [items, setItems] = useState(['Buy milk', 'Walk dog']);
  const [input, setInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault(); // prevents page reload
    if (!input.trim()) return;
    setItems((prev) => [...prev, input]);
    setInput(''); // clear the field after adding
  }

  function handleRemove(index) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item} <button onClick={() => handleRemove(i)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 6. Interview Questions & Answers

### Q1: What is the difference between passing `onClick={handleClick}` and `onClick={handleClick()}`?

**Answer:**
`onClick={handleClick}` passes a reference to the function — React calls it when the button is clicked. `onClick={handleClick()}` calls the function immediately during render and passes the return value to `onClick`. Unless `handleClick` returns a function, this is almost always a bug.

**Example:**

```jsx
// correct — runs on click
<button onClick={handleClick}>Click</button>

// wrong — runs on every render
<button onClick={handleClick()}>Click</button>
```

---

### Q2: Why can't you update state by writing `state.items.push(newItem)`?

**Answer:**
React only re-renders when you call the setter. Mutating the existing object or array changes the data silently — React never knows a change happened, so the UI stays stale. You must always produce a new value and pass it to the setter.

**Example:**

```jsx
// wrong — mutates in place, no re-render
items.push(newItem);
setItems(items);

// correct — new array triggers re-render
setItems([...items, newItem]);
```

---

### Q3: When should you use the functional update form `setState(prev => ...)`?

**Answer:**
Whenever the new value depends on the previous value. Because state is a snapshot, multiple synchronous calls to `setState(value + 1)` all read the same snapshot. The functional form receives the most recently queued value, so each call builds on the last.

**Example:**

```jsx
// both see the same `count` — increments by 1
setCount(count + 1);
setCount(count + 1);

// each sees the queued result — increments by 2
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

---

### Q4: What makes a component "controlled" and why does it matter?

**Answer:**
A controlled component has its input value stored in React state and passed back via `value`. Every keystroke calls `onChange`, which updates state, which updates the input. This means React is always the source of truth — you can validate, transform, or block input on every change and derive other UI from the current value.

---

### Q5: What happens if you set `value` on an input but do not provide `onChange`?

**Answer:**
The input becomes read-only and the user cannot type in it. React will also log a warning. If you want an input that starts with a value but is then uncontrolled, use `defaultValue` instead.

---

### Q6: How does React know to re-render a component when state changes?

**Answer:**
Calling the setter returned by `useState` signals React that this component's state has changed. React schedules a re-render: it calls the component function again with the new state value, diffs the output against the previous render, and updates only the parts of the DOM that changed.

---

### Q7: How do you remove one item from a list stored in state?

**Answer:**
Use `.filter` to produce a new array that excludes the item, then pass that array to the setter. Never use `.splice` — it mutates the original array.

**Example:**

```jsx
function removeItem(index) {
  setItems((prev) => prev.filter((_, i) => i !== index));
}
```

---

## Quick Reference Checklist

- [ ] Event handler names are camelCase (`onClick`, not `onclick`)
- [ ] Passing a function reference to event props, not a call (`onClick={fn}`, not `onClick={fn()}`)
- [ ] `event.preventDefault()` called when handling form submission
- [ ] State is never mutated directly — always use the setter with a new value
- [ ] Functional update form (`prev => ...`) used when new value depends on old value
- [ ] Controlled inputs have both `value` and `onChange`
- [ ] List updates use `.filter` (remove) or `.map` (update), never `.splice` or `.push`
