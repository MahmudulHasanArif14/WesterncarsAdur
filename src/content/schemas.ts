import { z } from 'zod';
export const schemas = {
  pages: {
    home: z.object({
      "hero": z.object({
        "slides": z.array(z.object({
          "id": z.string(),
          "heading": z.string(),
          "subheading": z.string(),
          "body": z.string(),
          "phone": z.string()
        }))
      }),
      "welcome": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "body": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "app": z.object({
        "heading": z.string(),
        "body": z.string()
      }),
      "whyChooseUs": z.object({
        "heading": z.string(),
        "body": z.string(),
        "points": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "areas": z.object({
        "heading": z.string(),
        "list": z.array(z.object({
          "id": z.string(),
          "name": z.string()
        }))
      }),
      "about": z.object({
        "heading": z.string(),
        "body": z.string()
      })
    }),
    services: z.object({
      "services": z.array(z.object({
        "title": z.string(),
        "description": z.string(),
        "id": z.string()
      }))
    }),
    contact_us: z.object({
      "heading": z.string(),
      "businessName": z.string(),
      "address": z.string(),
      "phone": z.string(),
      "hours": z.string(),
      "directionsUrl": z.string()
    }),
    terms: z.object({
      "heading": z.string(),
      "intro": z.string(),
      "sections": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "body": z.string()
      }))
    }),
    privacy_policy: z.object({
      "heading": z.string(),
      "intro": z.string(),
      "sections": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "body": z.string()
      }))
    }),
    faq: z.object({
      "heading": z.string(),
      "subheading": z.string(),
      "faqs": z.array(z.object({
        "id": z.string(),
        "question": z.string(),
        "answer": z.string()
      })),
      "ctaHeading": z.string(),
      "ctaBody": z.string(),
      "ctaPhone": z.string()
    })
  }
};
export type Schemas = typeof schemas;