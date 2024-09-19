/* import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import prisma from "../lib/db";
import Link from "next/link";
import { Prisma } from "@prisma/client";

interface TimeSlotsProps {
  selectedDate: Date;
  username: string;
}

async function getAvailability(username: string, date: Date) {
  const dayName = format(date, "EEEE"); // This will return the full day name (e.g., "Monday")

  const availability = await prisma.availability.findMany({
    where: {
      User: {
        username: username,
      },
      day: dayName as Prisma.EnumDayFilter,
      isActive: true,
    },
    select: {
      fromTime: true,
      tillTime: true,
    },
  });

  return availability;
}

function generateTimeSlots(
  fromTime: string,
  tillTime: string,
  interval: number
): string[] {
  const result: string[] = [];

  // Helper function to convert time in 'HH:MM' format to total minutes
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Helper function to convert total minutes back to 'HH:MM' format
  const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  let currentTime = timeToMinutes(fromTime);
  const endTime = timeToMinutes(tillTime);

  while (currentTime <= endTime) {
    result.push(minutesToTime(currentTime));
    currentTime += interval;
  }

  return result;
}

export async function TimeSlots({ selectedDate, username }: TimeSlotsProps) {
  const data = await getAvailability(username, selectedDate);

  const timeSlots = generateTimeSlots(data[0]?.fromTime, data[0]?.tillTime, 60);

  return (
    <div>
      <p className="text-base font-semibold">
        {format(selectedDate, "EEE")}.{" "}
        <span className="text-sm text-[#6B7280]">
          {format(selectedDate, "MMM. d")}
        </span>
      </p>
      <div className="mt-3 max-h-[350px] overflow-y-auto">
        {timeSlots.length > 0 ? (
          timeSlots.map((slot, index) => (
            <Link
              key={index}
              href={`book?date=${format(
                selectedDate,
                "yyyy-MM-dd"
              )}&time=${slot}`}
            >
              <Button variant="outline" className="w-full mb-2">
                {slot}
              </Button>
            </Link>
          ))
        ) : (
          <p>No available time slots for this date.</p>
        )}
      </div>
    </div>
  );
}
 */

import { format } from "date-fns";
import prisma from "../lib/db";
import { Prisma } from "@prisma/client";

interface iappProps {
  selectedDate: Date;
  userName: string;
}

async function getAvailability(currentDay: string, userName: string) {
  const data = await prisma.availability.findFirst({
    where: {
      day: currentDay as Prisma.EnumDayFilter,
      User: {
        username: userName,
      },
    },
    select: {
      fromTime: true,
      tillTime: true,
      id: true,
    },
  });

  return data;
}

export async function TimeSlots({ selectedDate, userName }: iappProps) {
  const currentDay = format(selectedDate, "EEEE");

  const data = await getAvailability(currentDay, userName);

  return (
    <div>
      <p className="text-base font-semibold">
        {format(selectedDate, "EEE")}.{" "}
        <span className="text-sm text-muted-foreground">
          {format(selectedDate, "MMM. d")}
        </span>
      </p>
    </div>
  );
}
