import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import React from "react";

async function getData(eventTypeId: string) {
  const data = await prisma.eventType.findUnique({
    where: {
      id: eventTypeId,
    },
    select: {
      title: true,
      description: true,
      duration: true,
      url: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}
const EditEventTypePage = async ({
  params,
}: {
  params: { eventTypeId: string };
}) => {
  const data = await getData(params.eventTypeId);
  return <h1>yo</h1>;
};

export default EditEventTypePage;
