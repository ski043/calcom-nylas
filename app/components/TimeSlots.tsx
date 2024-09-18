import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import prisma from "../lib/db";

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
      day: "Wednesday",
    },
    select: {
      fromTime: true,
      tillTime: true,
    },
  });

  return availability;
}

export async function TimeSlots({ selectedDate, username }: TimeSlotsProps) {
  const timeSlots = await getAvailability(username, selectedDate);

  console.log(timeSlots);

  return (
    <div>
      <p className="text-base font-semibold">
        {format(selectedDate, "EEE")},{" "}
        <span className="text-sm text-[#6B7280]">
          {format(selectedDate, "MMM. d")}
        </span>
      </p>
      {timeSlots.length > 0 ? (
        timeSlots.map((slot, index) => (
          <Button key={index} variant="outline" className="w-full mt-3">
            {/*   {format(new Date(slot.start), "HH:mm")} */}g
          </Button>
        ))
      ) : (
        <p>No available time slots for this date.</p>
      )}
    </div>
  );
}
