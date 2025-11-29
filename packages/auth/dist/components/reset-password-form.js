'use client';
"use client";

// src/components/reset-password-form.tsx
import { useState } from "react";
import { useAuth } from "@act/auth";
import { jsx, jsxs } from "react/jsx-runtime";
function ResetPasswordForm({ onSuccess, onError }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await resetPassword(email);
      if (error) {
        onError?.(error.message);
      } else {
        onSuccess?.();
      }
    } catch (err) {
      onError?.(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium", children: "Email Address" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "email",
          type: "email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true,
          className: "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2",
          placeholder: "Enter your email address"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        disabled: loading,
        className: "w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50",
        children: loading ? "Sending reset link..." : "Reset Password"
      }
    )
  ] });
}
export {
  ResetPasswordForm
};
