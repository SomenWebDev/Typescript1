# `any` vs `unknown` in TypeScript: What's the Difference?

**Topic:** TypeScript Type Safety
**Level:** Beginner to Intermediate
**Language:** English

---

## Table of Contents

1. [Introduction](#introduction)
2. [What is `any`?](#what-is-any)
3. [Why `any` is a Type Safety Hole](#why-any-is-a-type-safety-hole)
4. [What is `unknown`?](#what-is-unknown)
5. [Why `unknown` is Safer](#why-unknown-is-safer)
6. [Type Narrowing](#type-narrowing)
7. [When to Use Which](#when-to-use-which)
8. [Conclusion](#conclusion)

---

## Introduction

TypeScript is built to make JavaScript safer through static typing. But what happens when you don't know the type of a value upfront?

TypeScript offers two options: `any` and `unknown`. They might look similar on the surface, but their behavior is completely different — and choosing the wrong one can silently break your app.

---

## What is `any`?

`any` tells TypeScript to **stop type-checking entirely** for that variable. Once something is typed as `any`, you can treat it like anything — a string, a function, an object — and TypeScript won't complain.

```ts
// TypeScript accepts ALL of this without a single error
let value: any = "Hello";

value(); // Called like a function
value.age; // Accessed like an object
value.foo.bar; // Chained property access
```

> **Note:** TypeScript compiles this successfully — but your app may crash at runtime.

---

## Why `any` is a Type Safety Hole

TypeScript's whole job is to catch mistakes _before_ your code runs. `any` turns that protection off completely.

```ts
// ❌ A classic `any` trap
function printLength(data: any) {
  console.log(data.length);
}

printLength(100);
// Output: undefined
// No TypeScript error — but 100 has no `.length`
```

This is why developers call `any` a **"type safety hole"** — unsafe code passes through the type system undetected. You lose everything TypeScript was supposed to give you.

---

## What is `unknown`?

`unknown` also accepts any value — but it **refuses to let you use the value** until you prove what type it actually is.

Think of it as a locked box: you can put anything in, but you have to identify the contents before you can open it.

```ts
let value: unknown = "Hello";

// ❌ This will NOT compile
value.toUpperCase();
// Error: Object is of type 'unknown'
```

TypeScript blocks you here because you haven't verified the type yet.

---

## Why `unknown` is Safer

`unknown` forces you to validate before you act. That one requirement prevents a whole class of runtime bugs.

```ts
let value: unknown = "Hello";

// ✅ Check the type first — then TypeScript unlocks the methods
if (typeof value === "string") {
  console.log(value.toUpperCase()); // Works perfectly
}
```

By requiring a type check upfront, `unknown` keeps the safety net intact while still being flexible.

---

## Type Narrowing

**Type narrowing** is the mechanism TypeScript uses to move from a broad type down to a specific one — based on the checks you write.

### Common Narrowing Techniques

| Technique         | Example                         |
| ----------------- | ------------------------------- |
| `typeof`          | `typeof x === "string"`         |
| `instanceof`      | `x instanceof Date`             |
| `in` operator     | `"name" in obj`                 |
| Custom type guard | `function isUser(x): x is User` |

### Example 1 — Narrowing a Union Type

```ts
function process(value: string | number) {
  if (typeof value === "string") {
    // ✅ TypeScript knows: value is string here
    console.log(value.length);
  } else {
    // ✅ TypeScript knows: value is number here
    console.log(value.toFixed(2));
  }
}
```

Each branch gets its own specific type — no manual casting needed.

### Example 2 — Narrowing from `unknown`

```ts
function printValue(value: unknown) {
  if (typeof value === "string") {
    console.log("String →", value.toUpperCase());
  } else if (typeof value === "number") {
    console.log("Number →", value.toFixed(2));
  } else {
    console.log("Unrecognized type — skipping.");
  }
}
```

This pattern works especially well for API responses or external data where the shape is uncertain.

---

## When to Use Which

| Situation                                    | Use                   |
| -------------------------------------------- | --------------------- |
| Migrating old JavaScript code                | `any` _(temporarily)_ |
| Third-party library with no type definitions | `any` _(last resort)_ |
| Quick throwaway prototype                    | `any`                 |
| Handling API responses                       | `unknown` ✅          |
| Processing user input                        | `unknown` ✅          |
| Parsing external or dynamic JSON             | `unknown` ✅          |

> **Rule of thumb:** Default to `unknown`. Reach for `any` only when there's genuinely no better option.

---

## Conclusion

`any` disables TypeScript's type system entirely. Once you use it, TypeScript can no longer catch mistakes before runtime — that's what makes it a type safety hole.

`unknown` keeps protection intact. It accepts any value but requires you to verify the type before using it. Paired with **type narrowing**, it gives you a safe, clean way to handle unpredictable data.

**Key takeaways:**

- Prefer `unknown` over `any` whenever you're dealing with external or dynamic data
- Use type narrowing (`typeof`, `instanceof`, etc.) to safely unlock specific types
- Reserve `any` only as a last resort

The more you trust TypeScript's type system, the fewer surprises you'll face at runtime.
