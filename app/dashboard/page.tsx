import { Button } from "@/components/ui/button";

import { Switch } from "@/components/ui/switch";
import { Users2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardIndexPage = () => {
  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="font-heading text-3xl md:text-4xl">Speisekarten</h1>
          <p className="text-lg text-muted-foreground">
            Erstellen und verwalten Sie Speisekarten.
          </p>
        </div>
        <Button>Create New Event</Button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="  overflow-hidden shadow rounded-lg border">
          <Link href={`menu/sdf`}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users2 className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium truncate ">
                      15 min termin
                    </dt>
                    <dd>
                      <div className="text-lg font-medium ">15 min termin</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>
          <div className="bg-secondary px-5 py-3 flex justify-between items-center">
            <Switch id="airplane-mode" />

            <Link href={`menu/sdf`}>
              <Button className="">Edit Timing</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardIndexPage;
