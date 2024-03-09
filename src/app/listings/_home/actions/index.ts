"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { z } from "zod";

const FormSchema = z
  .object({
    id: z.string(),
  })
  .required();

export type PrevState = {
  errors?: {
    id?: string[];
  };
  message?: string | null;
};

export async function deleteListing(id: string, prevState: PrevState) {
  const validatedFields = FormSchema.safeParse({
    id,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Request failed! Invalid data.",
    };
  }

  try {
    const res = await fetch(`${process.env.BASE_URL}/listings/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Request failed!");
    }

    //Since this action is being called in within the same page, you don't need to call redirect.
    //Important: Calling revalidatePath/Tag will trigger a new server request and re-render the route.
    revalidatePath("/"); //or use revalidateTag("Listing");->tag must have been passed to fetch()

    return { message: "Deleted!" };
  } catch (error: any) {
    // If a database error occurs, return a more specific error.
    return {
      message: error.message || "Request Failed!",
    };
  }
}
