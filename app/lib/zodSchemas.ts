import { z } from "zod";
import { conformZodMessage } from "@conform-to/zod";

export function onboardingSchema(options?: {
  isUsernameUnique: () => Promise<boolean>;
}) {
  return z.object({
    username: z
      .string()
      .min(3)
      .max(150)
      // Pipe the schema so it runs only if the email is valid
      .pipe(
        // Note: The callback cannot be async here
        // As we run zod validation synchronously on the client
        z.string().superRefine((_, ctx) => {
          // This makes Conform to fallback to server validation
          // by indicating that the validation is not defined
          if (typeof options?.isUsernameUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
            return;
          }

          // If it reaches here, then it must be validating on the server
          // Return the result as a promise so Zod knows it's async instead
          return options.isUsernameUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: "custom",
                message: "Username is already used",
              });
            }
          });
        })
      ),
    fullName: z.string().min(3).max(150),
    description: z.string().min(3).max(1500),
  });
}

export const onboardingSchemaLocale = z.object({
  username: z.string().min(3).max(150),
  fullName: z.string().min(3).max(150),
  description: z.string().min(3).max(1500),
});

export const aboutSettingsSchema = z.object({
  fullName: z.string().min(3).max(150),
  description: z.string().min(3).max(1500),
});
