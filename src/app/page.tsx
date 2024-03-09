import { Suspense } from "react";
import PropertyList from "./listings/_home/components/PropertyList";
import MapView from "./listings/_home/components/MapView";

export default function Home() {
  return (
    <div className=" grid md:grid-cols-5 ">
      <div className="col-span-3 p-6 ">
        <Suspense
          fallback={
            <div>
              <p>Loading...</p>
            </div>
          }
        >
          <PropertyList />
        </Suspense>
      </div>

      <div className="col-span-2 ">
        <MapView />
      </div>
    </div>
  );
}
