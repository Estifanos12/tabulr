import React from "react";

import { dbService } from "@/services/db";
import QuickStart from "@/components/quick-start";
import DBStats from "@/components/stats";


export default async function Home() {
  const isRunning = await dbService.isRunning();

  return (
    <React.Fragment>
      <div className="flex flex-col gap-4">
        <DBStats />
        <QuickStart />
      </div>
    </React.Fragment>
  );
}
