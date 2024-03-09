"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();

  //Debouncing to prevent unnecessary db queries/api requests

const handleSearch = useDebouncedCallback((term) => {
  //Web API that provides utility methods for manipulating the URL query parameters.
  //Instead of creating a complex string literal, you can use it to get the params string like ?page=1&query=a.
  const params = new URLSearchParams(searchParams);
  params.set("page", "1"); //reset page to 1 when user types a new search query
  if (term) {
    params.set("query", term);
  } else {
    params.delete("query");
  }
  //updates the URL with the user's search data
  //The URL is updated without reloading the page, thanks to Next.js's client-side navigation
  //replace will Perform a client-side navigation to the provided route without adding a new entry into the browser’s history stack
  //For new data to show, fetch should be set to no-store or you should revalidate path here before replace()
 //Note: revalidatePath/Tag only invalidates the cache when the included path is next visited. 
  //push() would work too.
  
  replace(`${pathname}?${params.toString()}`);
}, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()} // input field is in sync with the URL and will be populated when sharing
      />
      {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
    </div>
  );
}
