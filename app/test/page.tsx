"use client";

import { NylasDatePicker } from "@nylas/react";
import { NylasLocaleSwitch } from "@nylas/react";

const TesTpage = () => {
  // Define the selectable dates (e.g., the next 30 days)
  const generateSelectableDates = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  return (
    <div className="w-[500px]">
      <NylasLocaleSwitch />
      <NylasDatePicker
        selectedDate={new Date()}
        selectedLanguage="en"
        eventDuration={30}
        selectableDates={generateSelectableDates()} // Pass the selectable dates
      />
    </div>
  );
};

export default TesTpage;
