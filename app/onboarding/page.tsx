import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { SubmitButton } from "../components/SubmitButton";

const OnboardingPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to CalMarshal</CardTitle>
          <CardDescription>
            We need the following information to set up your profile
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-y-5">
          <div className="grid gap-y-2">
            <Label>Username</Label>
            <Input placeholder="Jan marshal" />
          </div>
          <div className="grid gap-y-2">
            <Label>Full Name</Label>

            <div className="flex rounded-md">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                CalMarshal.com/
              </span>
              <Input
                type="text"
                id="company-website"
                placeholder="www.example.com"
                className="rounded-l-none"
              />
            </div>
          </div>

          <SubmitButton text="Submit" />
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingPage;
