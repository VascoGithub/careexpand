"use client"

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Appointment, deleteAppointmentAsync } from "@/lib/features/appointments/appointmentsSlice";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { format } from "date-fns"
import { useAppDispatch } from "@/lib/hooks";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { unwrapResult } from "@reduxjs/toolkit";

interface AppointmentCardProps {
    setFormOpen: (open: boolean) => void;
    setAppointment: (appointment: Appointment) => void;
    appointmentsList: Appointment[]
}

const AppointmentTable = ({ appointmentsList, setFormOpen, setAppointment }: AppointmentCardProps) => {

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
        <div className="rounded-md border">
            <div className="bg-muted/50 p-4 sm:px-6">
                <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground">
                    <div className="col-span-5 sm:col-span-4">Name</div>
                    <div className="col-span-3 sm:col-span-2">Date</div>
                    <div className="col-span-3 sm:col-span-2">Time</div>
                    <div className="hidden sm:block sm:col-span-4">Description</div>
                    <div className="col-span-1"></div>
                </div>
            </div>
            <div>
                {appointmentsList && appointmentsList.length > 0 && (
                    <>
                        {appointmentsList.map((appointment, index) => (
                            <ContextMenu key={appointment.id}>
                                <ContextMenuTrigger>
                                    <div key={appointment.id}>
                                        <div className="grid grid-cols-12 items-center p-4 sm:px-6">
                                            <div className="col-span-5 sm:col-span-4 font-medium">{appointment.name}</div>
                                            <div className="col-span-3 sm:col-span-2 text-sm">{format(appointment.date, "MMM d, yyyy")}</div>
                                            <div className="col-span-3 sm:col-span-2 text-sm">{appointment.time}</div>
                                            <div className="hidden sm:block sm:col-span-4 text-sm text-muted-foreground break-words">
                                                {appointment.description}
                                            </div>
                                            <div className="col-span-1"></div>
                                        </div>
                                        {index < appointmentsList.length - 1 && <Separator />}
                                    </div>
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
        </div>
    );
};

export default AppointmentTable;
