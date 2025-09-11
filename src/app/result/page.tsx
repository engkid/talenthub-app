import { Suspense } from "react";
import ResultClient from "./ResultClient";

export const dynamic = "force-dynamic";

export default function ResultPage() {
  return (
    <Suspense fallback={<ResultFallback />}> 
      <ResultClient />
    </Suspense>
  );
}

function ResultFallback() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-4">Result</h1>
        <span className="inline-block px-2 py-1 rounded text-sm bg-gray-100 text-gray-600">
          Loading...
        </span>
      </div>
    </div>
  );
}
