import { LeftPanel } from "@/app/components/LeftPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock4 } from "lucide-react";
import React from "react";

const UserHello = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 w-[280px] border-r pr-6">
            <div className="grid gap-1">
              <img
                alt="Shadcn Cal"
                src="/avatar.jpeg"
                className="rounded-full border"
                width={24}
                height={24}
              />

              <p>Shadcn Cal</p>

              <p className="text-gray-11 text-sm font-semibold">Shadcn Cal</p>
            </div>
            <div className="grid gap-3">
              <p className="text-gray-12 text-2xl font-bold">Demo</p>

              <div className="flex items-center text-gray-12">
                <Clock4 className="size-4 mr-2" />
                <p className="text-sm font-semibold">15 mins</p>
              </div>
              <div className="flex items-center text-gray-12">
                <img
                  alt="Cal video"
                  src="/cal-video.svg"
                  className="mr-2"
                  width={16}
                  height={16}
                />

                <p className="text-sm font-semibold">Cal video</p>

                <p>Cal video</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserHello;
