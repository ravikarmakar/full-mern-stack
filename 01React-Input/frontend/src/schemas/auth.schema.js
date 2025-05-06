import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z
    .string()
    .email("Invalid email format.")
    .refine(
      (val) => val.endsWith("@gmail.com"),
      "Disposable or fake email domain not allowed."
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .refine(
      (value) => /[a-z]/.test(value),
      "Password must contain at least one lowercase letter."
    )
    .refine(
      (value) => /[A-Z]/.test(value),
      "Password must contain at least one uppercase letter."
    )
    .refine(
      (value) => /[0-9]/.test(value),
      "Password must contain at least one number."
    )
    .refine(
      (value) => /[^a-zA-Z0-9\s]/.test(value),
      "Password must contain at least one special character."
    ),
});

// export type RegisterFormData = z.infer<typeof registerSchema>; // for typescript
