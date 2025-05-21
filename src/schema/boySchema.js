import { z } from 'zod';

// Create validation schema for boy form - includes all fields from the form
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
    .max(10, { message: 'invalidMobile' }),
  girlmobileNumber: z
    .string()
    .min(10, { message: 'invalidMobile' })
    .max(10, { message: 'invalidMobile' })
    .optional(),

  // Religious Information (all optional)
  firstNameReceiptDate: z.string().optional(),
  satnamReceiptDate: z.string().optional(),
  dateOfNameReceipt: z.string().optional(),
  abstractReceiptDate: z.string().optional(),

  // Declaration Information
  declarantSon: z.string().min(1, { message: 'requiredField' }),
  childFrom: z.string().min(1, { message: 'requiredField' }),
  ramainSiriNo: z.string().min(1, { message: 'requiredField' }),
  location: z.string().min(1, { message: 'requiredField' }),
  dateOfRamaini: z.string().min(1, { message: 'requiredField' }),

  // These fields were in schema but might not be necessary for form submission
  declarantName: z.string().optional(),
  declarantResident: z.string().optional(),
  wantToMarry: z.string().optional(),
  wantToMarryState: z.string().optional(),
  childName: z.string().optional(),
  childDistrict: z.string().optional(),

  generatedDeclaration: z.string().optional(),
  acceptDeclaration: z.boolean().optional(),
  acceptFinalDeclaration: z.boolean().optional(),

  // Important Questions
  isAdult: z.string().min(1, { message: 'requiredField' }),
  isDowryFree: z.string().min(1, { message: 'requiredField' }),
  agreeWithRules: z.string().min(1, { message: 'requiredField' }),
  isAlreadyMarried: z.string().min(1, { message: 'requiredField' }),

  // File uploads (handled separately in the form)
  girlPhoto: z.any().optional(),
  boyPhoto: z.any().optional(),
  boySignature: z.any().optional(),
  familySignature: z.any().optional(),
  aadharCard: z.any().optional(),
  marksheet: z.any().optional(),
  namdikashaForm: z.any().optional(),
  divorceCertificate: z.any().optional(),
});

export default boyFormSchema;
