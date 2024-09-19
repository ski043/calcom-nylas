"use server";

import { parseWithZod } from "@conform-to/zod";
import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import {
  aboutSettingsSchema,
  eventTypeSchema,
  onboardingSchema,
} from "./lib/zodSchemas";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";
import { nylas } from "./lib/nylas";

export async function onboardingAction(prevState: any, formData: FormData) {
  const session = await requireUser();
  const submission = await parseWithZod(formData, {
    // create the zod schema with `isEmailUnique()` implemented
    schema: onboardingSchema({
      async isUsernameUnique() {
        const exisitngSubDirectory = await prisma.user.findUnique({
          where: {
            username: formData.get("username") as string,
          },
        });
        return !exisitngSubDirectory;
      },
    }),

    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const user = await prisma.user.update({
    where: {
      id: session.user?.id as string,
    },
    data: {
      username: submission.value.username,
      name: submission.value.fullName,

      Availability: {
        createMany: {
          data: [
            {
              day: "Monday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Tuesday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Wednesday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Thursday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Friday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Saturday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Sunday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
          ],
        },
      },
    },
  });

  return redirect("/dashboard");
}

export async function SettingsAction(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: aboutSettingsSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const user = await prisma.user.update({
    where: {
      id: session.user?.id as string,
    },
    data: {
      name: submission.value.fullName,
      image: submission.value.profileImage,
    },
  });

  return redirect("/dashboard");
}

export async function CreateEventTypeAction(
  prevState: any,
  formData: FormData
) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: eventTypeSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.eventType.create({
    data: {
      title: submission.value.title,
      duration: submission.value.duration,
      url: submission.value.url,
      description: submission.value.description,
      userId: session.user?.id as string,
    },
  });

  return redirect("/dashboard");
}

export async function EditEventTypeAction(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: eventTypeSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.eventType.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id as string,
    },
    data: {
      title: submission.value.title,
      duration: submission.value.duration,
      url: submission.value.url,
      description: submission.value.description,
    },
  });

  return redirect("/dashboard");
}

export async function DeleteEventTypeAction(formData: FormData) {
  const session = await requireUser();

  const data = await prisma.eventType.delete({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id as string,
    },
  });

  return redirect("/dashboard");
}

export async function updateEventTypeStatusAction(
  prevState: any,
  {
    eventTypeId,
    isChecked,
  }: {
    eventTypeId: string;
    isChecked: boolean;
  }
) {
  try {
    const session = await requireUser();

    const data = await prisma.eventType.update({
      where: {
        id: eventTypeId,
        userId: session.user?.id as string,
      },
      data: {
        active: isChecked,
      },
    });

    revalidatePath(`/dashboard`);
    return {
      status: "success",
      message: "EventType Status updated successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}

export async function updateAvailabilityAction(formData: FormData) {
  const session = await requireUser();

  const rawData = Object.fromEntries(formData.entries());
  const availabilityData = Object.keys(rawData)
    .filter((key) => key.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");
      return {
        id,
        isActive: rawData[`isActive-${id}`] === "on",
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string,
      };
    });

  try {
    await prisma.$transaction(
      availabilityData.map((item) =>
        prisma.availability.update({
          where: { id: item.id },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
          },
        })
      )
    );

    revalidatePath("/dashboard/availability");
    return { status: "success", message: "Availability updated successfully" };
  } catch (error) {
    console.error("Error updating availability:", error);
    return { status: "error", message: "Failed to update availability" };
  }
}

export async function createMeetingAction() {
  const now = Math.floor(Date.now() / 1000);

  await nylas.events.create({
    identifier: "4ee829c0-4f3e-44e5-b64a-791df8d210ea",
    requestBody: {
      title: "Meeting with Jan",
      description: "this is just an test meeting",

      when: {
        startTime: now,
        endTime: now + 3600,
      },
      conferencing: {
        autocreate: {},
        provider: "Google Meet",
      },
      participants: [
        {
          name: "Jan Marshal",
          email: "janniklasmarzahl@gmail.com",
          status: "yes",
        },
      ],
    },
    queryParams: {
      calendarId: "jan@alenix.de",
      notifyParticipants: true,
    },
  });
}

export async function cancelMeetingAction(formData: FormData) {
  const session = await requireUser();

  const userData = await prisma.user.findUnique({
    where: {
      id: session.user?.id as string,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  const data = await nylas.events.destroy({
    eventId: formData.get("eventId") as string,
    identifier: userData?.grantId as string,
    queryParams: {
      calendarId: userData?.email as string,
    },
  });

  revalidatePath("/dashboard/meetings");
}
