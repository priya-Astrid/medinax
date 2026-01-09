import z from 'zod';
const time24Regex = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
  message: 'Time must be in HH:mm format(24-hour)',
});
export const createAppointmentvaidate = z.object({
  body: z
    .object({
      patientId: z.string(),
      doctorId: z.string(),
      appointmentDate: z.coerce.date(),
      startTime: time24Regex,
      endTime: time24Regex,
      reason: z.string().optional(),
    })
    .refine((data) => data.startTime < data.endTime, {
      message: 'endTime must be after startTime',
      path: ['endTime'],
    }),
});

export const updateAppointmentValidate = z.object({
  body: z
    .object({
      reason: z.string().optional(),
      consultationNotes: z.string().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be updated',
    }),
});
export const updateStatusValidate = z.object({
  body: z.object({
    status: z.enum(['BOOKED', 'COMPLETED', 'CANCELLED', 'PENDING']),
  }),
});

export const rescheduleValidate = z.object({
  body: z
    .object({
      newDate: z.coerce.date(),
      startTime: time24Regex,
      endTime: time24Regex,
    })
    .refine((data) => data.startTime < data.endTime, {
      message: 'endTime must be after startTime',
      path: ['endTime'],
    }),
});
