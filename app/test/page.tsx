"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import face from "@/public/face.jpeg";
import { Camera, Timer } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const TestPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center  ">
      <Card className="max-w-[1000px] lg:mx-auto mx-5">
        <CardContent className="p-6 grid lg:grid-cols-7 grid-cols-1 ">
          <div className="col-span-2 ">
            <Image
              src={face}
              width={35}
              height={35}
              className="rounded-full"
              alt="face"
            />
            <p className="text-gray-700 text-sm font-semibold pt-1">
              Shadcn Cal
            </p>
            <p className=" text-2xl font-bold pt-5">Demo</p>
            <p className=" text-sm text-gray-600">
              Hey this meeting is there to meet me. my name is jan marshal and
              this meeting will be 30 mins in total
            </p>
            <Separator className="my-5" />
            <p className="flex items-center mt-2">
              <Timer className="size-4 mr-1 text-primary" />
              <span className="text-gray-600 text-sm ">15 mins</span>
            </p>
            <p className="flex items-center mt-2">
              <Camera className="size-4 mr-1 text-primary" />
              <span className="text-gray-600 text-sm ">
                Details provided upon confirmation.
              </span>
            </p>
          </div>

          <div className="col-span-3 w-full flex items-center justify-center">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>

          <div className="col-span-2">
            <h1>Time</h1>
            <div className="grid gap-y-2 mt-3">
              <Button variant="outline" className="w-full">
                15:00
              </Button>
              <Button variant="outline" className="w-full">
                15:00
              </Button>
              <Button variant="outline" className="w-full">
                15:00
              </Button>
              <Button variant="outline" className="w-full">
                15:00
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestPage;
