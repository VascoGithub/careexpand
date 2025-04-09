"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Grid2X2, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { selectAppointments, fetchAllAppointmentsAsync, Appointment } from "@/lib/features/appointments/appointmentsSlice"
import AppointmentForm from "./AppointmentForm"
import AppointmentCard from "./AppointmentCard"
import AppointmentFakeForm from "./AppointmentFakeForm"
import AppointmentTable from "./AppointmentTable"
import { useKeyboardShortcut } from "@/app/hooks/useKeyboardShortcut"
import AppointmentSearch from "./AppointmentSearch"

export default function AppointmentUI() {
  const [view, setView] = useState<"card" | "list">("card")
  const [open, setFormOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();

  const dispatch = useAppDispatch();
  const appointmentsList = useAppSelector(selectAppointments);
  useKeyboardShortcut("j", () => setFormOpen((open) => !open), { meta: true });

  useEffect(() => {
    dispatch(fetchAllAppointmentsAsync());
    console.log("Fetching appointments...");
  }, [dispatch]);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage your upcoming appointments, right-click to edit/delete them.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <AppointmentSearch />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <AppointmentForm
                open={open}
                setOpen={setFormOpen}
                appointment={selectedAppointment}
              />
              <AppointmentFakeForm />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setView((prevView) => (prevView === "card" ? "list" : "card"))}
              className="h-8 gap-1 flex items-center space-x-2"
            >
              {view === "card" ? <List className="h-4 w-4" /> : <Grid2X2 className="h-4 w-4" />}
              <span className="hidden sm:inline">
              {view === "card" ? "List" : "Card"}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {view === "card" ? (
        <AppointmentCard
          appointmentsList={appointmentsList}
          setFormOpen={setFormOpen}
          setAppointment={setSelectedAppointment}
        />
      ) : (
        <AppointmentTable
          appointmentsList={appointmentsList}
          setFormOpen={setFormOpen}
          setAppointment={setSelectedAppointment}
        />
      )}
    </div>
  )
}
