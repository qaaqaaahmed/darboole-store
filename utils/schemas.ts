import { z, ZodSchema } from "zod";

export const productSchema = z.object({
  name: z.string().min(4, {
    message: "Product name must be at least 4 characters",
  }),
  company: z.string().min(4),
  price: z.coerce.number().int().min(0, {
    message: "price must be a positive number",
  }),
  description: z.string().refine(
    (description) => {
      const wordLength = description.split(" ").length;
      return wordLength >= 10 && wordLength <= 1000;
    },
    { message: "description must be between 10 and 1000 words" }
  ),
  featured: z.coerce.boolean(),
});

export const imageSchema = z.object({
  image: validateImage(),
});

export const reviewsSchema = z.object({
  productId: z.string().refine((value) => value != "", {
    message: "You have to provide a product id",
  }),
  authorName: z.string().refine((value) => value !== "", {
    message: "Author name cannot be empty",
  }),
  authorImageUrl: z.string().refine((value) => value !== "", {
    message: "Author Image Url cannot be empty",
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "rating must be at least 1" })
    .max(5, { message: "rating can be at most 5" }),
  comment: z
    .string()
    .min(10, { message: "You have to write at least 10 characters" })
    .max(1000, {
      message: "bro you wrote more than 1000 characters, this aint a church",
    }),
});

function validateImage() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "file size must be less than 1MB")
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    });
}

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
}
