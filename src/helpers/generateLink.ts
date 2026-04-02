import { EventData } from "@/types/eventData";

export function generateLink(eventData: EventData) {
  const adminId = eventData.adminId;
  const eventName = eventData.eventName;

  const link = `http://localhost:3000/fill-form/${adminId}/${eventName}`;
  return link;
}
