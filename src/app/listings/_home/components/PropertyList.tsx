import React from "react";

import Pagination from "../../../components/Pagination";
import { IListing } from "@/app/types";
import { ListingItem } from "./ListingItem";
import { notFound } from "next/navigation";

interface IQuery {
  query: string;
  currentPage: number;
  itemsPerPage: number;
}

//Segment Config Options->Time-based revalidation
//export const revalidate = 3; //in secs/ revalidate at most every hour

//opt route out of caching for pagination & query to work
export const dynamic = "force-dynamic";

async function getListings({
  query,
  currentPage,
  itemsPerPage,
}: IQuery): Promise<IListing[]> {
  //React extends fetch to automatically memoize fetch requests while rendering a React component tree.
  //You can use fetch with async/await in Server Components, in Route Handlers, and in Server Actions.
  //In Server Actions, fetch requests are not cached (defaults cache: no-store).
  //Fetch results are memoized in generateMetadata, generateStaticParams, Layouts, Pages, and other Server Components.
  //Also applies only to the GET method in fetch requests
  //You opt out of fetch requests caching(static rendering) when:
  // The cache: 'no-store' is added to fetch requests.
  // The revalidate: 0 option is added to individual fetch requests.
  // The fetch request is inside a Router Handler that uses the POST method.
  // The fetch request comes after the usage of headers or cookies.
  // The const dynamic = 'force-dynamic' route segment option is used.
  // The fetchCache route segment option is configured to skip cache by default.
  // The fetch request uses Authorization or Cookie headers and there's an uncached request above it in the component tree.
  const res = await fetch(
    `${process.env.BASE_URL}/listings?_page=${currentPage}&_limit=${itemsPerPage}&location_like=${query}`,
    {
      next: { tags: ["Listing"] }, //On-demand Revalidation: use revalidateTag/Path
    }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    //throw new Error("Failed to fetch data");
    //notFound can be used when you try to fetch a resource that doesn't exist.
    //notFound will take precedence over error.tsx, so you can reach out for it when you want to handle more specific errors!
    notFound(); //will show an error UI to the user
  }

  return res.json();
}

async function fetchListingPages(): Promise<IListing[]> {
  return await fetch(`${process.env.BASE_URL}/listings`).then((res) =>
    res.json()
  );
}

//#Dynamic Rendering
//With Dynamic Rendering, routes are rendered for each user at request time.
//Dynamic rendering is useful when a route has data that is personalized to the user or has information that can only be known at request time,
//such as cookies or the URL's search params.
//Using Dynamic Functions will cause your route to be dynamically rendered:
// cookies() and headers(): Using these in a Server Component will opt the whole route into dynamic rendering at request time.
// searchParams: Using the Pages prop will opt the page into dynamic rendering at request time.
// As a developer, you do not need to choose between static and dynamic rendering as Next.js will automatically choose the best rendering strategy for each route based on the features and APIs used. Instead, you choose when to cache or revalidate specific data, and you may choose to stream parts of your UI.
export default async function PropertyList({
  //params,
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 9;

  //const listings = await getListings({ query, currentPage, itemsPerPage });

  //get pages
  //fetch the data on the server, and pass it to the Pagination client component as a prop.
  //You don't want to fetch data on the client as this would expose your database secrets (remember, you're not using an API layer).
  // const allListings = await fetchListingPages();
  //const totalPages = allListings.length;

  // A "waterfall" refers to a sequence of network requests that depend on the completion of previous requests.
  // In the case of data fetching, each request can only begin once the previous request has returned data.
  //   This pattern is not necessarily bad.
  //   However, this behavior can also be unintentional and impact performance.
  //#   Parallel data fetching
  // A common way to avoid waterfalls is to initiate all data requests at the same time - in parallel.

  const [listings, allListings] = await Promise.all([
    getListings({ query, currentPage, itemsPerPage }),
    fetchListingPages(),
  ]);

  const totalPages = allListings.length;

  if (!listings) return <p>No listings found</p>;

  return (
    <div className="relative    p-4">
      <div className="h-[86vh] overflow-y-auto pb-24">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {listings.map((lis) => (
            <ListingItem key={lis.id} listing={lis} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
