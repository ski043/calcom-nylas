import { Button } from "@/components/ui/button";
import React from "react";
import { createMeetingAction } from "../actions";

const TestPage = () => {
  return (
    <form action={createMeetingAction}>
      <Button type="submit">Create Meeting</Button>
    </form>
  );
};

export default TestPage;
