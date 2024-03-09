import { IListing } from "@/app/types";
import { MapPin } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import MapView from "../_home/components/MapView";

type Params = {
  params: {
    id: string;
  };
};

//Segment Config Options->Time-based revalidation
export const revalidate = 3600; //in secs/ revalidate at most every hour

// //metadata
// export async function generateMetadata({ params }: Params): Promise<Metadata> {
//   // read route params
//   const id = params.id;
//   // fetch data
//   const res = await fetch(`${process.env.BASE_URL}/listings/${id}`);

//   if (!res.ok) {
//     notFound();
//   }
//   const listing: IListing = await res.json();

//   return { title: `Property Category: ${listing.category}` };
// }

//#Static Rendering (Default)
//With Static Rendering, routes are rendered at build time, or in the background after data revalidation.
//Gen static params
//The generateStaticParams function can be used in combination with dynamic route segments to statically generate routes at build time instead of on-demand at request time.

// export async function generateStaticParams() {
//   const res = await fetch(`${process.env.BASE_URL}/listings`);

//   if (!res.ok) {
//     notFound();
//   }

//   const listings: IListing[] = await res.json();

//   return listings.map((lis) => ({
//     id: lis.id,
//   }));
// }

async function getListingById(id: string): Promise<IListing | null> {
  const res = await fetch(`${process.env.BASE_URL}/listings/${id}`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function Page({ params }: Params) {
  const listing = await getListingById(params.id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4 h-[90vh] overflow-y-auto">
      <div className="col-span-3 p-8">
        <Image
          src={
            listing.images[Math.floor(Math.random() * listing.images.length)]
          }
          alt="Property image"
          className="w-full h-[450px] object-cover object-left rounded-lg cursor-pointer"
          width={500}
          height={500}
        />

        <div className="flex flex-col gap-y-4 py-4">
          <h6 className="text-md">{listing.bedrooms} Bedrooms</h6>
          <div className="flex">
            <MapPin className="text-gray-400 mr-3 h-6 w-6" />
            <p className="text-small text-default-500">{listing.location}</p>
          </div>

          <h5>${listing.price}</h5>

          <p className="text-sm text-gray-400">
            {new Date(listing.createdAt).toLocaleString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="col-span-2 ">
        <MapView />
      </div>
    </div>
  );
}
