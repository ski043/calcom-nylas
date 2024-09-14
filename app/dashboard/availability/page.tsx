import { SubmitButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { times } from "@/app/lib/times";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { notFound } from "next/navigation";
import React from "react";

async function getData(userEmail: string) {
  const data = await prisma.availability.findMany({
    where: {
      userEmail: userEmail,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

const AvailablityPage = async () => {
  const session = await requireUser();
  const data = await getData(session.email as string);

  console.log(data);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
          <CardDescription>
            In this section you can manage your availability.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          {data.map((item) => (
            <div className="grid grid-cols-6 items-center gap-4 " key={item.id}>
              <div className="flex items-center gap-x-3">
                <Switch name="switch" checked={item.isActive} />
                <p>{item.day}</p>
              </div>
              <Select defaultValue={item.fromTime}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="From Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select defaultValue={item.tillTime}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Too Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </Card>
    </>
  );
};

export default AvailablityPage;
