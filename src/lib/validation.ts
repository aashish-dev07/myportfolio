/** Shared by the client form and the API route so both agree on the rules. */

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  /** Honeypot — real users never fill this. */
  website?: string;
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Digits, spaces and the usual separators; 7–15 digits once stripped.
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/;

export function validateContact(input: Partial<ContactPayload>): FieldErrors {
  const errors: FieldErrors = {};

  const name = input.name?.trim() ?? "";
  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 80) errors.name = "That name is too long.";

  const email = input.email?.trim() ?? "";
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "That doesn't look like a valid email.";

  const phone = input.phone?.trim() ?? "";
  if (phone && !PHONE_RE.test(phone)) errors.phone = "That doesn't look like a valid number.";

  const subject = input.subject?.trim() ?? "";
  if (subject.length < 3) errors.subject = "Add a short subject.";
  else if (subject.length > 120) errors.subject = "Keep the subject under 120 characters.";

  const message = input.message?.trim() ?? "";
  if (message.length < 10) errors.message = "Tell me a little more (10 characters minimum).";
  else if (message.length > 3000) errors.message = "Please keep it under 3000 characters.";

  return errors;
}

export const MESSAGE_MAX = 3000;
