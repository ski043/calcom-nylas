import { SettingsForm } from "@/app/components/dashboard/settingsForm";
import { SubmitButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { notFound } from "next/navigation";
import React from "react";

async function getData(email: string) {
  const data = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      fullName: true,
      email: true,
      description: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

const SettingsPage = async () => {
  const session = await requireUser();
  const data = await getData(session.email as string);
  return (
    <SettingsForm
      description={data.description as string}
      email={data.email}
      fullName={data.fullName as string}
    />
  );
};

export default SettingsPage;
