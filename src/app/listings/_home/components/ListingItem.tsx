"use client";
import Link from "next/link";

import { deleteListing } from "../actions";
import { IListing } from "@/app/types";
import Image from "next/image";
import { useTransition } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "@/app/components/SubmitButton";
import clsx from "clsx";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import Toast from "@/app/components/Toast";
import { MapPin } from "lucide-react";

type ListingItemProps = {
  listing: IListing;
};

export function ListingItem({ listing }: ListingItemProps) {
  const deleteListingWithId = deleteListing.bind(null, listing.id);

  const initialState = { message: null, errors: {} as any };

  const [state, dispatch] = useFormState(deleteListingWithId, initialState);

  return (
    <Card className="rounded-md">
      <Toast message={state?.message} />
      <CardHeader className="flex gap-3">
        <Link href={`/listings/${listing.id}`} className="w-full">
          <Image
            src={
              listing.images[Math.floor(Math.random() * listing.images.length)]
            }
            alt="Picture of property"
            className="w-full h-[230px] object-cover object-left rounded-lg cursor-pointer"
            width={500}
            height={500}
          />
        </Link>
      </CardHeader>

      <CardBody className="flex flex-col gap-y-1">
        <h6 className="text-md">{listing.bedrooms} Bedrooms</h6>
        <div className="flex">
          <MapPin className="text-gray-400 mr-3 h-6 w-6" />
          <p className="text-small text-default-500">{listing.location}</p>
        </div>

        <h5>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumSignificantDigits: 3,
          }).format(listing.price)}
        </h5>

        <div className="flex justify-between">
          <p className="text-sm text-gray-400">
            {new Date(listing.createdAt).toLocaleString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <Chip size="sm">
            <p className="lowercase">{listing.category}</p>
          </Chip>
        </div>
      </CardBody>

      <CardFooter className="flex justify-between">
        <Link href={`/listings/edit/${listing.id}`}>
          <Button size="sm" variant="flat" color="primary">
            EDIT
          </Button>
        </Link>

        <form action={dispatch}>
          <SubmitButton size="sm" variant="flat" color="danger">
            DELETE
          </SubmitButton>
        </form>
      </CardFooter>
    </Card>
  );
}
