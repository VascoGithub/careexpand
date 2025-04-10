import { createAppSlice } from "@/lib/createAppSlice";
import { createAppointment, deleteAppointment, fetchAllAppointments, fetchAppointmentsByName } from "./appointmentsAPI";

export interface Appointment {
  id: string
  name: string
  description: string
  date: string
  time: string
}

export interface AppointmentSliceState {
  list: Appointment[]
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AppointmentSliceState = {
  list: [],
  status: "idle",
};

export const appointmentSlice = createAppSlice({
  name: "appointments",
  initialState,
  reducers: (create) => ({
    createAppointmentAsync: create.asyncThunk(
      async (params: {id: string, name: string; date: string; time: string; description: string }) => {
        return await createAppointment(params.id, params.name, params.date, params.time, params.description)
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "succeeded";
    
          const existingIndex = state.list.findIndex(appointment => appointment.id === action.payload.id);
    
          if (existingIndex !== -1) {
            state.list[existingIndex] = action.payload;
          } else {
            state.list.push(action.payload);
          }
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    deleteAppointmentAsync: create.asyncThunk(
      async (params: {id: string}) => {
        return await deleteAppointment(params.id)
      },
      {
        pending: (state) => {
          state.status = "loading";

        },
        fulfilled: (state, action) => {
          state.status = "succeeded";
          state.list = state.list.filter(appointment => appointment.id !== action.payload.id);
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    fetchAllAppointmentsAsync: create.asyncThunk(
      async () => {
        return await fetchAllAppointments()
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "succeeded";
          state.list = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    fetchAllAppointmentsMatchingNameAsync: create.asyncThunk(
      async (params: {name: string}) => {
        return await fetchAppointmentsByName(params.name)
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "succeeded";
          state.list = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
  }),
  selectors: {
    selectStatus: (appointment) => appointment.status,
    selectAppointments: (appointment) => appointment.list,
  },
});

export const {createAppointmentAsync, fetchAllAppointmentsAsync, deleteAppointmentAsync, fetchAllAppointmentsMatchingNameAsync } =
  appointmentSlice.actions;

export const {selectStatus, selectAppointments } = appointmentSlice.selectors;
