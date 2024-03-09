"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <NextUIProvider>
      {children}
      <ToastContainer
        theme="dark"
        autoClose={3000} //in milliseconds || false //if false, no progress bar//
        hideProgressBar={true} //default: false
        //pauseOnFocusLoss={false} //default: true
        pauseOnHover
        closeOnClick //disabled autoClose
        draggable
      />
    </NextUIProvider>
  );
};

export default Providers;
