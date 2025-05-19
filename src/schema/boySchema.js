import { z } from 'zod';

// Create validation schema for boy form - only includes fields present in the form
const boyFormSchema = z.object({
  // Personal Information
  boyName: z.string().min(1, { message: 'requiredField' }),
  boyFatherName: z.string().min(1, { message: 'requiredField' }),
  boyMotherName: z.string().min(1, { message: 'requiredField' }),
  boyDOB: z.string().min(1, { message: 'requiredField' }),
  boyAge: z
    .string()
    .min(1, { message: 'requiredField' })
    .refine((val) => parseInt(val) >= 21, { message: 'invalidAge' }),

  // Contact Information
  fullAddress: z.string().min(1, { message: 'requiredField' }),
  tehsil: z.string().min(1, { message: 'requiredField' }),
  district: z.string().min(1, { message: 'requiredField' }),
  state: z.string().min(1, { message: 'requiredField' }),
  mobileNumber: z
    .string()
    .min(10, { message: 'invalidMobile' })
    .max(15, { message: 'invalidMobile' }),

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
});

export default boyFormSchema;
