"use client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

type ToastProps = {
  message: string;
  variant?: "error" | "success";
};

const Toast = ({ message, variant="success" }: ToastProps) => {
  useEffect(() => {
    if (!message) return;

    if (variant === "error")
      toast.error(
        typeof message === "string" ? message : "Error: Request failed"
      );

    if (variant === "success")
      toast.success(
        typeof message === "string" ? message : "Error: Request failed"
      );

    return () => toast.dismiss();
  }, [message, variant]);

  return <div></div>;
};

export default Toast;
