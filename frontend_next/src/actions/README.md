# Server Actions

This directory contains Next.js server actions using `next-safe-action` for type-safe server-side operations.

## Files

### `safe-action.ts`
Base configuration for creating type-safe server actions.

```typescript
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient();
```

### `server-action.ts`
Contact form submission handler.

```typescript
"use server";

import { actionClient } from "./safe-action";
import { formSchema } from "@/lib/form-schema";

export const serverAction = actionClient
  .inputSchema(formSchema)
  .action(async ({ parsedInput }) => {
    // Process form data
    console.log("Contact form submission:", parsedInput);
    
    return {
      success: true,
      message: "Thank you for your message!",
    };
  });
```

## Usage

### In Client Components

```tsx
"use client";

import { useAction } from "next-safe-action/hooks";
import { serverAction } from "@/actions/server-action";

export function MyForm() {
  const { execute, status, result } = useAction(serverAction, {
    onSuccess: (data) => {
      console.log("Success:", data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    execute({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      // ... other fields
    });
  };

  return (
    <form action={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

## Customization

### Add Email Sending

```typescript
// server-action.ts
"use server";

import { actionClient } from "./safe-action";
import { formSchema } from "@/lib/form-schema";
import { sendEmail } from "@/lib/email"; // Your email service

export const serverAction = actionClient
  .inputSchema(formSchema)
  .action(async ({ parsedInput }) => {
    // Send email
    await sendEmail({
      to: "contact@yourcompany.com",
      subject: `New contact from ${parsedInput.name}`,
      body: `
        Name: ${parsedInput.name}
        Email: ${parsedInput.email}
        Company: ${parsedInput.company}
        Message: ${parsedInput.message}
      `,
    });

    return {
      success: true,
      message: "Thank you for your message!",
    };
  });
```

### Add Database Storage

```typescript
// server-action.ts
"use server";

import { actionClient } from "./safe-action";
import { formSchema } from "@/lib/form-schema";
import { db } from "@/lib/db"; // Your database client

export const serverAction = actionClient
  .inputSchema(formSchema)
  .action(async ({ parsedInput }) => {
    // Save to database
    await db.contacts.create({
      data: parsedInput,
    });

    return {
      success: true,
      message: "Thank you for your message!",
    };
  });
```

## Error Handling

```typescript
export const serverAction = actionClient
  .inputSchema(formSchema)
  .action(async ({ parsedInput }) => {
    try {
      // Your logic here
      
      return {
        success: true,
        message: "Success!",
      };
    } catch (error) {
      console.error("Error processing form:", error);
      
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }
  });
```

## Resources

- [next-safe-action Documentation](https://next-safe-action.dev/)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
