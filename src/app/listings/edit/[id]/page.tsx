import { IListing } from "@/app/types";
import { notFound } from "next/navigation";
import EditForm from "./components/EditForm";

type Params = {
  params: {
    id: string;
  };
};

//Segment Config Options->Time-based revalidation
//Can only be used in  Page, Layout, or Route Handler
export const revalidate = 3600; //in secs/ revalidate at most every hour

async function getListingById(id: string): Promise<IListing | null> {
  return await fetch(`${process.env.BASE_URL}/listings/${id}`).then((res) =>
    res.json()
  );
}

export default async function Page({ params }: Params) {
  const listing = await getListingById(params.id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="min-h-[90vh] flex p-6 justify-center  items-start ">
      <EditForm listing={listing} />
    </div>
  );
}
