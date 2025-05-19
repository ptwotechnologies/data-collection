import { z } from 'zod';

// Create validation schema for boy form
const boyFormSchema = z.object({
  boyName: z.string().min(1, { message: 'requiredField' }),
  boyFatherName: z.string().min(1, { message: 'requiredField' }),
  boyMotherName: z.string().min(1, { message: 'requiredField' }),
  boyDOB: z.string().min(1, { message: 'requiredField' }),
  boyAge: z
    .string()
    .min(1, { message: 'requiredField' })
    .refine((val) => parseInt(val) >= 21, { message: 'invalidAge' }), // Updated age requirement for boys
  fullAddress: z.string().min(1, { message: 'requiredField' }),
  tehsil: z.string().min(1, { message: 'requiredField' }),
  district: z.string().min(1, { message: 'requiredField' }),
  state: z.string().min(1, { message: 'requiredField' }),
  mobileNumber: z
    .string()
    .min(10, { message: 'invalidMobile' })
    .max(15, { message: 'invalidMobile' }),
  firstNameReceiptDate: z.string().optional(),
  satnamReceiptDate: z.string().optional(),
  dateOfNameReceipt: z.string().optional(),
  abstractReceiptDate: z.string().optional(),
  declarantName: z.string().min(1, { message: 'requiredField' }),
  declarantSon: z.string().min(1, { message: 'requiredField' }),
  declarantResident: z.string().min(1, { message: 'requiredField' }),
  wantToMarry: z.string().min(1, { message: 'requiredField' }),
  wantToMarryState: z.string().min(1, { message: 'requiredField' }),
  childName: z.string().min(1, { message: 'requiredField' }),
  childFrom: z.string().optional(),
  childDistrict: z.string().optional(),
  ramainSiriNo: z.string().optional(),
  location: z.string().min(1, { message: 'requiredField' }),
  dateOfRamaini: z.string().min(1, { message: 'requiredField' }),
  isAdult: z.string().min(1, { message: 'requiredField' }),
  isDowryFree: z.string().min(1, { message: 'requiredField' }),
  agreeWithRules: z.string().min(1, { message: 'requiredField' }),
  isAlreadyMarried: z.string().min(1, { message: 'requiredField' }),
  acceptDeclaration: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the declaration' }),
  }),
  boySignatureName: z.string().min(1, { message: 'requiredField' }),
  boySignatureMobile: z
    .string()
    .min(10, { message: 'invalidMobile' })
    .max(15, { message: 'invalidMobile' }),
  boySignatureRelation: z.string().min(1, { message: 'requiredField' }),
  boySignatureDate: z.string().min(1, { message: 'requiredField' }),
});

export default boyFormSchema;
