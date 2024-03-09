"use server";
import { LISTING_IMAGES } from "@/app/constants";
import generateID from "@/app/lib/generateID";
import { Category, ListingStatus } from "@/app/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

const FormSchema = z
  .object({
    id: z.string(),
    images: z.string().array(),
    bedrooms: z.string({
      invalid_type_error: "Field is required.",
    }),
    bathrooms: z.string(),
    location: z.string(),
    status: z.nativeEnum(ListingStatus, {
      invalid_type_error: "Please select status.",
    }),
    category: z.nativeEnum(Category, {
      invalid_type_error: "Please select a category.",
    }),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .omit({ id: true, images: true, createdAt: true, updatedAt: true })
  .required();

export type PrevState = {
  errors?: Record<string, string[]>;
  message?: string | null;
};
export async function addListing(prevState: PrevState, formData: FormData) {
  // const validatedFields = FormSchema.parse({
  //   customerId: formData.get("customerId"),
  //   amount: formData.get("amount"),
  //   status: formData.get("status"),
  // }) ;

  //if many entries use:
  //The Object.fromEntries() static method transforms a list of key-value pairs into an object
  //#formData.entries() returns =/= Object.entries(object) eg [['foo', 'bar'],['baz', 42],]

  const rawFormData = Object.fromEntries(formData.entries()) as z.infer<
    typeof FormSchema
  >;

  //#safeParse() instead of parse() will return an object containing either a success or error field.
  //This will help handle validation more gracefully without having put this logic inside the try/catch block.
  // Validate form fields using Zod
  const validatedFields = FormSchema.safeParse(rawFormData);

  // If form validation fails, return errors early. Otherwise, continue.
  //validatedFields = {"success": boolean, data: boolean, errors: {field: string[]}}
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Request failed! Invalid data.",
    };
  }

  try {
    const res = await fetch(`${process.env.BASE_URL}/listings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, //req by json-server in POST, PUT or PATCH to process req.body
      body: JSON.stringify({
        ...validatedFields.data,
        images: LISTING_IMAGES,
        updateAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        id: generateID(),
        price: Math.floor(100000 + Math.random() * 900000),
      }),
    });

    if (!res.ok) {
      throw new Error("Request failed!");
    }
  } catch (error: any) {
    // If a database error occurs, return a more specific error.
    return {
      message: error.message || "Database Error: Failed to add listing",
    };
  }

  //Since we want to display the added listing, we should clear listings cache and trigger a new request to the server.
  //Note: revalidatePath/Tag only invalidates the cache when the included path is next visited.
  //Can only be used in  Server Components, Route Handlers, and Server Actions
  revalidatePath("/"); //or use revalidateTag("Listing");->tag must have been passed to fetch()
  //Redirect to list page:
  //redirect can be used in Server Components, Route Handlers, and Server Actions.

  //**Note how redirect is being called outside of the try/catch block.
  //This is because redirect works by throwing an error, which would be caught by the catch block.
  //To avoid this, you can call redirect after try/catch. redirect would only be reachable if try is successful. */

  redirect("/");
}
