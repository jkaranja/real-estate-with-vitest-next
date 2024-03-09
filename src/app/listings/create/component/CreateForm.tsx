"use client";
import React from "react";
import { addListing } from "../actions";
import { useFormState } from "react-dom";
import Link from "next/link";
import { INITIAL_STATE } from "@/app/constants";
import SubmitButton from "@/app/components/SubmitButton";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Category, ListingStatus } from "@/app/types";
import Toast from "@/app/components/Toast";

const CreateForm = () => {
  const [state, dispatch] = useFormState(addListing, INITIAL_STATE);

  return (
    <Card className="py-4 w-[500px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Add a listing</h4>
        <Toast message={state?.message} />

        {/* <p className="text-red-500">{JSON.stringify(state)}</p> */}
      </CardHeader>

      <form action={dispatch} className="">
        <CardBody className="overflow-visible p space-y-3 p-6">
          <Input
            data-testid="bedrooms"
            label="Bedrooms"
            name="bedrooms"
            size="sm"
            variant="bordered"
            isInvalid={Boolean(state.errors?.bedrooms?.[0])}
            errorMessage={state.errors?.bedrooms?.[0]}
            isRequired
          />
          <Input
            name="bathrooms"
            label="Bathrooms"
            size="sm"
            variant="bordered"
            isInvalid={Boolean(state.errors?.bathrooms?.[0])}
            errorMessage={state.errors?.bathrooms?.[0]}
            //isRequired
          />
          <Input
            label="Location"
            name="location"
            size="sm"
            variant="bordered"
            isInvalid={Boolean(state.errors?.bedrooms?.[0])}
            errorMessage={state.errors?.bedrooms?.[0]}
            isRequired
          />

          <Select
            name="status"
            isRequired
            label="Status"
            variant="bordered"
            size="sm"
            isInvalid={Boolean(state.errors?.status?.[0])}
            errorMessage={state.errors?.status?.[0]}
          >
            {Object.values(ListingStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </Select>

          <Select
            name="category"
            isRequired
            variant="bordered"
            label="Category"
            size="sm"
            //defaultSelectedKeys={["cat"]}
            isInvalid={Boolean(state.errors?.category?.[0])}
            errorMessage={state.errors?.category?.[0]}
          >
            {Object.values(Category).map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </Select>
        </CardBody>
        <CardFooter className="flex gap-1 justify-between px-6">
          <Link href="/">
            <Button> Cancel</Button>
          </Link>

          <SubmitButton>Create</SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateForm;
