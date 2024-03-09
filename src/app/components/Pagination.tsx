"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, Pagination as NextUIPagination } from "@nextui-org/react";
import { revalidatePath } from "next/cache";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  //creates an instance of the current search parameters.
  //updates the "page" parameter to the provided page number.
  //constructs the full URL using the pathname and updated search parameters.
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (pageNumber: number) => {
    replace(createPageURL(pageNumber));
  };

  return (
    <div className="flex items-center flex-col md:flex-row justify-center  gap-3 bg-white pt-3">
      <Button
        size="sm"
        variant="flat"
        color="secondary"
        onPress={() =>
          handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)
        }
        isDisabled={currentPage <= 1}
      >
        Previous
      </Button>

      <div>
        <NextUIPagination
          showControls
          total={totalPages}
          color="secondary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
      <Button
        size="sm"
        variant="flat"
        color="secondary"
        onPress={() =>
          handlePageChange(
            currentPage < totalPages ? currentPage + 1 : currentPage
          )
        }
        isDisabled={currentPage >= totalPages}
      >
        Next
      </Button>
    </div>
  );
}
