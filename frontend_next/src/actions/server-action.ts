"use server";

import { actionClient } from "./safe-action";
import { formSchema } from "@/lib/form-schema";

export const serverAction = actionClient
  .inputSchema(formSchema)
  .action(async ({ parsedInput }) => {
    // TODO: Process the form data (send email, save to database, etc.)
    // For now, just log it
    console.log("Contact form submission:", parsedInput);

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    };
  });
