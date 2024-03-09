import { Suspense } from "react";
import CreateForm from "./component/CreateForm";

export default function Page() {
  return (
    <div className="min-h-[90vh] flex p-6 justify-center  items-start ">
      <CreateForm />
    </div>
  );
}
