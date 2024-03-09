"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode | string;
} & Record<string, any>;

const SubmitButton = ({ children, ...restProps }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      isLoading={pending}
      isDisabled={pending}
      color="primary"
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
