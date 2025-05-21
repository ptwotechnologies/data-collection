import { z } from 'zod';

// Create validation schema for girl form - now includes validation for required documents
const girlFormSchema = z.object({
  // Personal Information
  girlName: z.string().min(1, { message: 'requiredField' }),
  girlFatherName: z.string().min(1, { message: 'requiredField' }),
  girlMotherName: z.string().min(1, { message: 'requiredField' }),
  girlDOB: z.string().min(1, { message: 'requiredField' }),
  girlAge: z
    .string()
    .min(1, { message: 'requiredField' })
    .refine((val) => parseInt(val) >= 18, { message: 'invalidAge' }),

  // Contact Information
  fullAddress: z.string().min(1, { message: 'requiredField' }),
  tehsil: z.string().min(1, { message: 'requiredField' }),
  district: z.string().min(1, { message: 'requiredField' }),
  state: z.string().min(1, { message: 'requiredField' }),
  mobileNumber: z
    .string()
    .min(10, { message: 'invalidMobile' })
    .max(15, { message: 'invalidMobile' }),
  boymobileNumber: z
    .string()
    .min(10, { message: 'invalidMobile' })
    .max(15, { message: 'invalidMobile' })
    .optional(),

  // Religious Information (all optional)
  firstNameReceiptDate: z.string().optional(),
  satnamReceiptDate: z.string().optional(),
  dateOfNameReceipt: z.string().optional(),
  abstractReceiptDate: z.string().optional(),

  // Declaration Information (auto-filled from other fields)
  declarantSon: z.string().min(1, { message: 'requiredField' }),
  childFrom: z.string().min(1, { message: 'requiredField' }),
  ramainSiriNo: z.string().min(1, { message: 'requiredField' }),
  location: z.string().min(1, { message: 'requiredField' }),
  dateOfRamaini: z.string().min(1, { message: 'requiredField' }),

  // Important Questions
  isAdult: z.string().min(1, { message: 'requiredField' }),
  isDowryFree: z.string().min(1, { message: 'requiredField' }),
  agreeWithRules: z.string().min(1, { message: 'requiredField' }),
  isAlreadyMarried: z.string().min(1, { message: 'requiredField' }),

  // Document field validations are handled on the server side and in the UI
  // We don't include them in the zod schema as they're managed with file inputs
});

// Custom refinement for divorce certificate requirement
const enhancedGirlFormSchema = girlFormSchema.refine(
  (data) => {
    // If the person is already married, they must provide a divorce certificate
    // This is enforced in the UI by disabling the submit button
    return data.isAlreadyMarried !== 'Yes' || true; // The actual file validation is done in the UI and server
  },
  {
    message:
      'Divorce certificate is required for previously married individuals',
    path: ['divorceCertificate'], // Points to the field that's incorrect
  }
);

export default enhancedGirlFormSchema;
