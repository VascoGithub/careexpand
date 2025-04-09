"use client"

import React, {  } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Appointment, deleteAppointmentAsync } from "@/lib/features/appointments/appointmentsSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Edit2Icon, Trash2Icon } from "lucide-react";
import { format } from "date-fns"
import { useAppDispatch } from "@/lib/hooks";
import { toast } from "sonner";
import { unwrapResult } from "@reduxjs/toolkit";

interface AppointmentCardProps {
    setFormOpen: (open: boolean) => void;
    setAppointment: (appointment: Appointment) => void;
    appointmentsList: Appointment[]
}

const AppointmentCard = ({ appointmentsList, setFormOpen, setAppointment }: AppointmentCardProps) => {

    const dispatch = useAppDispatch();

    const handleDelete = async (id: string) => {

        const toastId = toast.loading("Deleting appointment...");
        
        try {
            const resultAction = await dispatch(deleteAppointmentAsync({ id }));

            unwrapResult(resultAction);

            //@ts-expect-error payload.name exists! Use deleteAppointmentAsync.fulfilled.match(resultAction) to avoid using this/
            toast.success(resultAction.payload.name + " appointment deleted!", {id: toastId});
        } catch (error: any) {
            toast.error(error.message, {id: toastId});
        }
    }

    const handleEdit = (appointment: Appointment) => {
        setAppointment(appointment);
        setFormOpen(true);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointmentsList && appointmentsList.length > 0 && (
                <>
                    {appointmentsList.map((appointment) => (
                        <ContextMenu key={appointment.id}>
                            <ContextMenuTrigger>
                                <Card key={appointment.id}>
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="truncate w-64">{appointment.name}</CardTitle>
                                        </div>
                                        <CardDescription className="flex items-center gap-1 mt-1">
                                            <Badge variant="outline" className="font-normal flex flex-col items-end gap-0.5">
                                                <span>{format(appointment.date, "EEEE, MMMM d, yyyy")}</span>
                                            </Badge>
                                            <CalendarClock className="h-3.5 w-3.5" />
                                            {appointment.time}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="hidden sm:block sm:col-span-4 text-sm text-muted-foreground break-words">
                                            {appointment.description}
                                        </div>
                                    </CardContent>
                                </Card>
                            </ContextMenuTrigger>
                            <ContextMenuContent className="w-64">
                                <ContextMenuItem inset onClick={() => handleDelete(appointment.id)}>
                                    <Trash2Icon />
                                    Delete
                                </ContextMenuItem>
                                <ContextMenuItem inset onClick={() => handleEdit(appointment)}>
                                    <Edit2Icon />
                                    Edit
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    ))}
                </>
            )}
        </div>

    );
};

export default AppointmentCard;
