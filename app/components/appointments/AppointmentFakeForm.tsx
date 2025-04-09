import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { generateUUID, getRandomAppointment } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createAppointmentAsync, selectStatus } from "@/lib/features/appointments/appointmentsSlice";
import { toast } from 'sonner'
import { unwrapResult } from "@reduxjs/toolkit";
import { useKeyboardShortcut } from "@/app/hooks/useKeyboardShortcut";

const AppointmentFakeForm = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);

    useKeyboardShortcut("r", () => handleSubmit(), { meta: true });

    const handleSubmit = async () => {
        const uuid = generateUUID();
        const { title, description } = getRandomAppointment();

        const toastId = toast.loading("Creating random appointment...");

        try {
            const resultAction = await dispatch(createAppointmentAsync({
                id: uuid,
                name: title,
                date: new Date().toISOString(),
                time: "11:30 ",
                description: description
            }));

            unwrapResult(resultAction);

            toast.success("New random appointment created!", { id: toastId });
        } catch (error: any) {
            toast.error(error.message, { id: toastId });
            console.error(error);
        }
    }

    return (
        <Button size="sm" className="h-8 gap-1" onClick={handleSubmit} disabled={status === "loading"}>
            New Random Appointment
            <kbd className="inline-flex h-5 select-none items-center gap-1 ml-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xl flex items-center">⌘</span>
                <span className="text-xs">r</span>
            </kbd>


        </Button>
    );
};

export default AppointmentFakeForm;
