import type { Metadata } from "next";
import AppointmentUI from "./components/appointments/Appointment";

export default function IndexPage() {
  return <AppointmentUI />;
}

export const metadata: Metadata = {
  title: "Redux Appointment Manager",
};
