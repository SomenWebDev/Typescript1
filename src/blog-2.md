# How `Pick` and `Omit` Utility Types Keep TypeScript Code DRY

## Introduction

As TypeScript applications grow, developers often work with large interfaces that contain many properties.  
However, not every part of an application needs all of those properties at the same time.

For example:

- A registration form only needs a user's `name` and `email`
- An admin dashboard may require every field
- A public profile page should never expose sensitive data like `password`

A common beginner mistake is creating separate interfaces manually for every situation.  
That approach leads to duplicated code that becomes difficult to maintain.

This is where TypeScript's `Pick` and `Omit` utility types become extremely useful.  
They allow developers to create specialized "slices" of a master interface while keeping the code DRY (Don't Repeat Yourself).

---

# The Problem: Manual Duplication

Suppose we have a base `User` interface:

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

Now imagine we want a public-facing version of this type.

A naive approach would be:// ❌ Bad: manually duplicating properties
interface PublicUser {
  id: number;
  name: string;
  email: string;
}
```

This works initially, but creates a major maintenance problem.

If the original User interface changes later, PublicUser does not update automatically.

For example:
email: string | null;
You would need to manually update every duplicated interface in the project.

This violates the DRY principle.

What Does DRY Mean?

DRY stands for:

Don't Repeat Yourself

The DRY principle encourages developers to avoid repeating the same code or structure multiple times.

Benefits of DRY code include:

Easier maintenance
Better consistency
Fewer bugs
Faster refactoring
Improved scalability

TypeScript utility types help apply DRY principles directly to type definitions.
What is Pick?

Pick creates a new type by selecting specific properties from another type.
Pick<Type, Keys>
Where:

Type → the source interface/type
Keys → the properties you want to keep
Example of Pick
interface User {
id: number;
name: string;
email: string;
password: string;
role: string;
}

// ✅ Good: derive from User directly
type PublicUser = Pick<User, "id" | "name" | "email">;
TypeScript automatically creates:
{
id: number;
name: string;
email: string;
}
Now PublicUser stays connected to the original User interface.

If any property type changes in User, the derived type updates automatically.
Why Pick Prevents Duplication

Without Pick, developers must manually rewrite the same properties repeatedly.

With Pick, the structure is derived from the original source.

That means:

One source of truth
Less repeated code
Automatic synchronization
Safer refactoring

This dramatically reduces maintenance costs in large projects.
What is Omit?

Omit works in the opposite way.

Instead of choosing what to keep, you specify what to remove.
Omit<Type, Keys>
Where:

Type → the source interface/type
Keys → the properties you want to exclude
Example of Omit
interface User {
id: number;
name: string;
email: string;
password: string;
role: string;
}

// ✅ Remove password before exposing data
type SafeUser = Omit<User, "password">;
Result:{
id: number;
name: string;
email: string;
role: string;
}
This is especially useful when removing sensitive fields like:

Passwords
Tokens
Secret keys
Internal metadata

Real-World Use Cases
API Responses

Never expose sensitive information to the client.
interface DatabaseUser {
id: number;
name: string;
email: string;
password: string;
}

// Remove password from API response
type ApiUser = Omit<DatabaseUser, "password">;
This ensures sensitive data stays protected.
Form Types

Forms usually only require a subset of fields.
interface Product {
id: number;
title: string;
price: number;
createdAt: string;
}

// Form only needs title and price
type ProductForm = Pick<Product, "title" | "price">;
This keeps forms clean and focused.
Combining Pick and Omit

These utility types can also be combined together.
interface User {
id: number;
name: string;
email: string;
password: string;
role: string;
}

// Step 1: Pick selected fields
// Step 2: Remove role
type EditableUser = Omit<
Pick<User, "name" | "email" | "role">,
"role"

> ;
> Final result:{
> name: string;
> email: string;
> }
> This pattern gives developers very precise control over derived types.
> Why This Matters in Large Applications

Large applications often contain many variations of the same data model.

Without utility types, developers may create many disconnected interfaces:
// ❌ Hard to maintain
interface UserPreview {}
interface UserCard {}
interface UserProfile {}
interface UserSummary {}
Over time this becomes fragile and error-prone.

Instead, utility types keep everything connected to the original interface:
// ✅ Derived from one source
type UserPreview = Pick<User, "id" | "name">;

type UserCard = Pick<User, "id" | "name" | "role">;

type SafeUser = Omit<User, "password">;

Now every derived type updates automatically whenever User changes.
This creates a true single source of truth.

# Conclusion

Pick and Omit are two of the most useful TypeScript utility types for keeping code DRY and maintainable.

Pick<Type, Keys> → keeps only selected properties

Omit<Type, Keys> → removes unwanted properties

These utility types help developers:

Avoid duplicated interfaces

Keep derived types synchronized

Improve maintainability

Reduce bugs during refactoring

Build scalable applications more safely

Instead of rewriting the same properties repeatedly, developers can create clean, reusable type slices directly from a master interface.
In modern TypeScript development, Pick and Omit are essential tools for writing cleaner and more maintainable code.
