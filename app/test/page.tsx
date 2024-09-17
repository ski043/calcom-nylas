import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import ProfilePic from "@/public/face.jpeg";
import Image from "next/image";
import { BookMarked, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const BookingPage = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-[850px] mx-auto ">
        <CardContent className="p-5 grid grid-cols-7">
          <div className="col-span-2">
            <Image
              src={ProfilePic}
              alt="profile"
              className="size-7 rounded-full"
            />
            <p className="text-sm font-medium text-[#6B7280] mt-1">
              Alex Fisher
            </p>
            <h1 className="text-xl font-semibold mt-2">Design Workshop</h1>
            <p className="text-sm font-medium text-[#374151]">
              A longer chat to run through design.
            </p>

            <div className="mt-5 grid gap-y-2">
              <p className="flex items-center">
                <Calendar className="size-4 mr-2 text-[#6B7280]" />
                <span className="text-sm font-medium text-[#374151]">
                  Friday, 24th June
                </span>
              </p>
              <p className="flex items-center">
                <Clock className="size-4 mr-2 text-[#6B7280]" />
                <span className="text-sm font-medium text-[#374151]">
                  30 Mins
                </span>
              </p>
              <p className="flex items-center">
                <BookMarked className="size-4 mr-2 text-[#6B7280]" />
                <span className="text-sm font-medium text-[#374151]">
                  Google Meet
                </span>
              </p>
            </div>
          </div>
          <div className="col-span-3">
            <p className="text-base font-semibold">
              June <span className="text-sm text-[#6B7280]">2022</span>
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-base font-semibold">
              Fri, <span className="text-sm text-[#6B7280]">Jun 24</span>
            </p>
            <Button variant="outline" className="w-full mt-3">
              10:00
            </Button>
            <Button variant="outline" className="w-full mt-3">
              10:00
            </Button>
            <Button variant="outline" className="w-full mt-3">
              10:00
            </Button>
            <Button variant="outline" className="w-full mt-3">
              10:00
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;
