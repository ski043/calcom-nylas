import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import React from "react";

const AvailablityPage = () => {
  return (
    <>
      <h1 className="text-lg font-semibold md:text-2xl">Availability</h1>

      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
          <CardDescription>
            In this section you can manage your availability.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex items-center gap-4">
            <Switch name="switch" />
            <p>Monday</p>
          </div>
          <div className="flex items-center gap-4">
            <Switch name="switch" />
            <p>Tuesday</p>
          </div>
          <div className="flex items-center gap-4">
            <Switch name="switch" />
            <p>Wensday</p>
          </div>
          <div className="flex items-center gap-4">
            <Switch name="switch" />
            <p>Thursday</p>
          </div>
          <div className="flex items-center gap-4">
            <Switch name="switch" />
            <p>Friday</p>
          </div>
          <div className="flex items-center gap-4">
            <Switch name="switch" />
            <p>Satuarday</p>
          </div>

          <div className="flex items-center gap-4">
            <Switch name="switch" />
            <p>Sunday</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AvailablityPage;
