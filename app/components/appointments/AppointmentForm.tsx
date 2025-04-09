import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { generateUUID } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Appointment, createAppointmentAsync, selectStatus } from "@/lib/features/appointments/appointmentsSlice";
import { toast } from 'sonner'
import { unwrapResult } from "@reduxjs/toolkit";

// Define time options for the select dropdown
const timeOptions = [
    "8:00 ", "8:30 ", "9:00 ", "9:30 ", "10:00 ", "10:30 ", "11:00 ",
    "11:30 ", "12:00 ", "12:30 ", "13:00 ", "13:30 ", "14:00 ", "14:30 ",
    "15:00 ", "15:30 ", "16:00 ", "16:30 ", "17:00 ", "17:30 ", "18:00 ",
    "18:30 ", "19:00 ", "19:30 ", "20:00 ", "20:30 ", "21:00 ", "21:30 ",
    "22:00 ", "22:30 ", "23:00 ", "23:30 ",
];

interface AppointmentFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    appointment?: Appointment
}


const AppointmentForm: React.FC<AppointmentFormProps> = ({
    open,
    setOpen,
    appointment,
}) => {

    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);

    //Form state
    const [formData, setFormData] = useState({
        id: generateUUID(),
        name: "",
        date: undefined as Date | undefined,
        time: "",
        description: "",
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Error state
    const [errors, setErrors] = useState({
        name: false,
        date: false,
        time: false
    });

    const [attempted, setAttempted] = useState(false);

    // Prefill form if appointment is provided
    useEffect(() => {
        if (appointment) {
            setFormData({ id: appointment.id, name: appointment.name, date: new Date(appointment.date), time: appointment.time, description: appointment.description })
        }
    }, [appointment]);

    const clearStates = () => {
        setFormData({ id: "", name: "", date: undefined, time: "", description: "" })
        setErrors({ name: false, date: false, time: false });
        setAttempted(false);
    }

    const validateForm = () => {
        const newErrors = {
            name: !formData.name.trim(),
            date: !formData.date,
            time: !formData.time
        };

        setErrors(newErrors);
        return !newErrors.name && !newErrors.date && !newErrors.time;
    };

    const ErrorMessage: React.FC<{ error: boolean; message: string, fallback: string }> = ({ error, message, fallback }) => (
        error ? <p className="text-red-500 text-sm">{message}</p> : fallback
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAttempted(true);
    
        if (!validateForm()) return;

        const toastId = toast.loading("Creating appointment...");
    
        try {
            const resultAction = await dispatch(createAppointmentAsync({
                id: formData.id,
                name: formData.name,
                date: formData.date?.toISOString() ?? new Date().toISOString(),
                time: formData.time,
                description: formData.description,
            }));
    
            unwrapResult(resultAction);
    
            toast.success(appointment ? "Appointment updated!" : "New appointment created!", {id: toastId});
            clearStates();
            setOpen(false);
        } catch (error: any) {
            toast.error(error.message , {id: toastId});
        }
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            clearStates();
        }
        setOpen(isOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1" disabled={status === "loading"} >
                    New Appointment

                    <kbd className="inline-flex h-5 select-none items-center gap-1 ml-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xl flex items-center">⌘</span>
                        <span className="text-xs">j</span>
                    </kbd>
                    

                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Appointment</DialogTitle>
                        <DialogDescription>Fill in the details for your new appointment.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="text">
                                <ErrorMessage error={errors.name} message="Name is required" fallback="Name" />
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => {
                                    handleInputChange("name", e.target.value);
                                    if (attempted) {
                                        setErrors({ ...errors, name: !e.target.value.trim() });
                                    }
                                }}
                                placeholder="Appointment name"
                                className={errors.name && attempted ? "border-red-500" : ""}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="grid gap-2">
                                <Label htmlFor="date">
                                    <ErrorMessage error={errors.date} message="Date is required" fallback="Date" />
                                </Label>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button id="date" variant="outline" className="justify-start text-left font-normal">
                                            {formData.date ? format(formData.date, "PPP") : "Select a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={formData.date} onSelect={(newDate) => {
                                            handleInputChange("date", newDate)
                                            if (attempted) {
                                                setErrors({ ...errors, date: !newDate });
                                            }
                                        }} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="time">
                                    <ErrorMessage error={errors.time} message="Time is required" fallback="Time" />
                                </Label>
                                <Select value={formData.time} onValueChange={(newTime) => {
                                    handleInputChange("time", newTime)
                                    if (attempted) {
                                        setErrors({ ...errors, time: !newTime });
                                    }
                                }}>
                                    <SelectTrigger id="time" className={errors.time && attempted ? "border-red-500" : ""}
                                    >
                                        <SelectValue placeholder={"Select time"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeOptions.map((timeOption) => (
                                            <SelectItem key={timeOption} value={timeOption}>
                                                {timeOption}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                placeholder="Add details about your appointment"
                                className="resize-none"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {appointment ? (
                            <Button type="submit" disabled={status === "loading"} >Update Appointment</Button>
                        ) : (
                            <Button type="submit" disabled={status === "loading"}>{status === "loading" ? "Creating Appointment " : "Create Appointment"}</Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AppointmentForm;
