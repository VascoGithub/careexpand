import { createAppointmentAsync } from "@/lib/features/appointments/appointmentsSlice";
import { makeStore } from "@/lib/store";

const mockAppointment = {
    id: '1',
    name: 'Test Appointment 1',
    description: 'Description 1',
    date: new Date().toDateString(),
    time: '10:00 ',
};

test('should handle createAppointment', async () => {

    const store = makeStore();
    // Ensure the initial state is empty
    expect(store.getState().appointments.list).toHaveLength(0);

    console.log(store.getState());

    // Dispatch the real action
    const action = store.dispatch(createAppointmentAsync({
        id: mockAppointment.id,
        name: mockAppointment.name,
        date: mockAppointment.date,
        time: mockAppointment.time,
        description: mockAppointment.description,
    }));

    // Wait for the action to be fulfilled
    const actionReturn = await action;
    console.log(actionReturn)

    console.log(store.getState());

    expect(store.getState().appointments.list).toHaveLength(1);
    expect(store.getState().appointments.list[0]).toEqual(mockAppointment);
});

test('should not modify state for unknown actions', async () => {
    const store = makeStore();
    const initialState = store.getState();

    // Dispatch an unknown action
    store.dispatch({ type: 'unknown/action', payload: {} });

    // Verify the state remains unchanged
    const state = store.getState();
    expect(state).toEqual(initialState);
});