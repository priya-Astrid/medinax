import z from "zod";

export const createRoleSchema = z.object({
  body: z.object({
    role: z.string().min(2),
    description: z.string().optional(),
  }),
});
export const assignPermissionSchema = z.object({
  body: z.object({
    permissions: z.array(z.string().min(1)),
  }),
});

export const createPermissionSchema = z.object({
    body: z.object({
        permissionName: z.string().min(1),
        description:z.string(),
    })
})

// import Joi from "joi";

// export const createPermission = Joi.object({
//     permissionName  :Joi.string().required(),
//     description: Joi.string().required(),
// });

// export const role = Joi.object({
//     role: Joi.string().required(),
//     description : Joi.string().required(),
// })