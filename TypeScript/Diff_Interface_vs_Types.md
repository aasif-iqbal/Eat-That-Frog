### what is difference between interface and type in typescript.

In TypeScript, **interface** and **type** are both used to define the shape of data, but they have distinct features and use cases. Here's a concise breakdown of their differences:

### 1. **Syntax**
- **Interface**:
  ```typescript:disable-run
  interface User {
    name: string;
    age: number;
  }
  ```
- **Type**:
  ```typescript
  type User = {
    name: string;
    age: number;
  };
  ```

### 2. **Extending/Combining**
- **Interface**: Supports **declaration merging**, meaning you can redefine the same interface to add more properties.
  ```typescript
  interface User {
    name: string;
  }
  interface User {
    age: number;
  }
  // Result: User has both name and age
  ```
  - Can extend other interfaces using `extends`:
  ```typescript
  interface Admin extends User {
    role: string;
  }
  ```

- **Type**: Does not support declaration merging but can create new types using **intersection** (`&`) or **union** (`|`).
  ```typescript
  type User = {
    name: string;
  };
  type Admin = User & {
    role: string;
  };
  // Intersection: Admin has name and role
  type Role = 'admin' | 'user'; // Union
  ```

### 3. **Flexibility**
- **Interface**: Primarily used for defining object shapes. Less flexible for other types like unions or primitives.
  ```typescript
  // Not ideal for non-object types
  interface Id {
    value: string | number; // Works, but less common
  }
  ```
- **Type**: More versatile, can represent **objects**, **unions**, **intersections**, **primitives**, or **complex types**.
  ```typescript
  type Id = string | number;
  type UserOrGuest = User | { guest: boolean };
  ```

### 4. **Use with Classes**
- **Interface**: Can be implemented by classes using `implements`.
  ```typescript
  interface User {
    name: string;
  }
  class Person implements User {
    name = "Alice";
  }
  ```
- **Type**: Cannot be directly implemented by classes, but can be used to type class instances.
  ```typescript
  type User = {
    name: string;
  };
  class Person {
    name = "Alice";
  }
  const person: User = new Person(); // Works
  ```

### 5. **Performance**
- **Interface**: Slightly better for tooling and error messages in some cases, as TypeScript optimizes interfaces for object shapes.
- **Type**: Can be slightly slower to resolve for complex union/intersection types due to their flexibility.

### 6. **When to Use**
- Use **interface** for:
  - Defining object shapes, especially for APIs or libraries.
  - When you need declaration merging (e.g., extending third-party types).
  - When implementing classes.
- Use **type** for:
  - Complex types like unions, intersections, or primitives.
  - More concise or flexible type definitions.
  - When you need to alias a type (e.g., `type Id = string | number`).

### Summary
- **Interface**: Best for object shapes, declaration merging, and class implementation.
- **Type**: More flexible for unions, intersections, and non-object types.
- Both can often be used interchangeably for simple object shapes, but **interface** is more common in object-oriented code, while **type** shines in functional or complex type scenarios.

If you have a specific use case in mind, I can provide a tailored example!
```