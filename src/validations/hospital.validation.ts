import z from 'zod';
export const HospitalSchema = z.object({
  body: z.object({
    hospitalName: z.string().min(2),
    telePhone1: z.string().length(10),
    telePhone2: z.string().length(10).optional(),
    email: z.string().email(),
    facilitices: z.array(z.string()).optional(),
    departments: z.array(z.string()).optional(),
    timing: z.object({
      open: z.string(),
      close: z.string(),
    }).optional(),
    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      pincode: z.string().optional(),
      country: z.string().optional(),
    }).optional(),
  }),
});

// import Joi from "joi";
// export const HospitalSchema = Joi.object({
//     hospitalName: Joi.string().min(2),
//   telePhone1: Joi.number().max(10),
//   telePhone2: Joi.number().max(10),
//   email: Joi.string().email(),
//   facilitices: Joi.array().items(Joi.string()).optional(),
//   departments: Joi.array().items(Joi.string()).optional(),
//   timing: Joi.object({
//     open: Joi.string().optional(),
//     close: Joi.string().optional(),
//   }),
//   address: Joi.object({
//     street:  Joi.string().optional(),
//     city:  Joi.string().optional(),
//     state:  Joi.string().optional(),
//     pincode:  Joi.string().optional(),
//     country:  Joi.string().optional(),
//   }),
// })
