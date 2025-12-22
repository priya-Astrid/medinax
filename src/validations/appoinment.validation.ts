import z from 'zod';
export const createAppointmentvaidate = z.object({
  body: z.object({
    patientId: z.string(),
    doctorId: z.string(),
    appointmentDate: z.coerce.date(),
    timeslot: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
    reason: z.string().optional(),
  
  }),
});

export const updateAppointmentValidate = z.object({
  body: z.object({
    reason: z.string().optional(),
    consultationNotes: z.string().optional(),
  }).refine(
    data => Object.keys(data).length > 0,
    { message: 'At least one field must be updated' },
  ),
});
export const updateStatusValidate= z.object({
  body:z.object({
       status: z.enum(['BOOKED', 'COMPLETED', 'CANCELLED', 'PENDING']),

  })
})

export const rescheduleValidate = z.object({
  body: z.object({
    newDate: z.coerce.date(),
    newTime: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  }),
});
