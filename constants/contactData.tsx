// constants/contactData.tsx
// Static contact form defaults

export const contactFormDefaults = {
    successMessage: 'Thank you! We\'ll get back to you within 24 hours.',
    fields: ['name', 'email', 'phone', 'message'] as const,
};