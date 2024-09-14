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
import { z } from "zod";

const availabilityUpdateSchema = z.object({
  id: z.number(),
  isActive: z.boolean(),
  fromTime: z.string(),
  tillTime: z.string(),
});

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
      email: session.email as string,
    },
    data: {
      username: submission.value.username,
      fullName: submission.value.fullName,
      description: submission.value.description,
      availability: {
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
      email: session.email as string,
    },
    data: {
      fullName: submission.value.fullName,
      description: submission.value.description,
      profileImage: submission.value.profileImage,
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
      userEmail: session.email as string,
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
      userEmail: session.email as string,
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
      userEmail: session.email as string,
    },
  });

  return redirect("/dashboard");
}

/* export async function updateAvailabilityAction(formData: FormData) {
  const session = await requireUser();

  const updates = [];
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("$ACTION")) continue; // Skip Next.js internal fields

    const [field, id] = key.split("-");
    const index = parseInt(id) - 1; // Adjust for 0-based array indexing
    if (!updates[index]) updates[index] = { id: parseInt(id) };

    if (field === "isActive") {
      updates[index][field] = value === "on";
    } else if (field === "isActiveHidden") {
      // Only set isActive if it wasn't already set by the switch
      if (updates[index].isActive === undefined) {
        updates[index].isActive = value === "true";
      }
    } else {
      updates[index][field] = value;
    }
  }

  // Filter out any undefined or empty entries
  const validUpdates = updates.filter((update) => update && update.id);

  console.log(validUpdates);

  try {
    await Promise.all(
      validUpdates.map((update) =>
        prisma.availability.update({
          where: {
            id: Number(update.id),
            userEmail: session.email as string,
          },
          data: {
            isActive: update.isActive,
            fromTime: update.fromTime,
            tillTime: update.tillTime,
          },
        })
      )
    );

    return { status: "success", message: "Availability updated successfully" };
  } catch (error) {
    console.error("Error updating availability:", error);
    return { status: "error", message: "Failed to update availability" };
  }
} */
