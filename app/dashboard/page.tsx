import { Button } from "@/components/ui/button";

import { Switch } from "@/components/ui/switch";
import { Users2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import prisma from "../lib/db";
import { notFound } from "next/navigation";
import { requireUser } from "../lib/hooks";

async function getData(email: string) {
  const data = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      EventType: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

const DashboardIndexPage = async () => {
  const session = await requireUser();
  const data = await getData(session.email as string);
  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="font-heading text-3xl md:text-4xl">Event Types</h1>
          <p className="text-lg text-muted-foreground">
            Create and manage your event types.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/new">Create New Event</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.EventType.map((item) => (
          <div
            className="  overflow-hidden shadow rounded-lg border"
            key={item.id}
          >
            <Link href={`menu/sdf`}>
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium truncate ">
                        {item.duration} Minutes Meeting
                      </dt>
                      <dd>
                        <div className="text-lg font-medium ">{item.title}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Link>
            <div className="bg-secondary px-5 py-3 flex justify-between items-center">
              <Switch id="airplane-mode" checked={item.active} />

              <Link href={`menu/sdf`}>
                <Button className="">Edit Event</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardIndexPage;
