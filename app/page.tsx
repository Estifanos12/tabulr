import React from "react";

import { dbClient } from "@/drivers";
import QuickStart from "@/components/quick-start";
import DBStats from "@/components/stats";

export default async function Home() {
  const isRunning = await dbClient.isRunning();

  if (!isRunning) throw new Error("Database is not running");
  return (
      <React.Fragment>
        <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold">Database Explorer</h2>
          <p className="text-sm text-muted-foreground">Manage and explore your database structures</p>
        </div>
        <DBStats />
        <QuickStart />
      </div>
    </React.Fragment>
  );
}
