import { Appointment } from "./appointmentsSlice";

export const createAppointment = async (id: string, name: string, date: string, time: string, description: string) => {
  
  try {
    const response = await fetch("http://localhost:3000/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, date, time, description }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const result = await response.json();

    if (!result || !result.data || typeof result.data !== "object") {
      console.error("Unexpected API response:", result);
      throw new Error("Invalid API response structure");
    }

    return result.data as Appointment;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteAppointment = async (id: string) => {
  try {
    const response = await fetch("http://localhost:3000/api/appointments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    console.log(response.status);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const result: { data: Appointment } = await response.json();
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchAllAppointments = async () => {

  try {
    const response = await fetch("http://localhost:3000/api/appointments", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const result: { data: Appointment[] } = await response.json();
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchAppointmentsByName = async (name: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/appointments?name=${encodeURIComponent(name)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const result: { data: Appointment[] } = await response.json();
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
