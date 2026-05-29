// types/contact.ts
export interface ContactFormData {
  name: string;
  email: string;
  contact: number | string;
  message: string;
}

export interface ContactResponse {
  status: string;
  message: string;
  data?: ContactFormData;
}

export interface ContactError {
  status: string;
  message: string;
  errors?: Record<string, string[]>;
}