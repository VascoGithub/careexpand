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
    //store.dispatch(deleteAllAppointmentAsync());
    expect(store.getState().appointments.list).toHaveLength(0);

    // Dispatch the real action
    await store.dispatch(createAppointmentAsync({
        id: mockAppointment.id,
        name: mockAppointment.name,
        date: mockAppointment.date,
        time: mockAppointment.time,
        description: mockAppointment.description,
    }));


    expect(store.getState().appointments.list).toHaveLength(1);
    expect(store.getState().appointments.list[0]).toEqual(mockAppointment);
});

test('should not modify state for unknown actions', async () => {
    const store = makeStore();
    const initialState = store.getState();

    // Dispatch an unknown action
    store.dispatch({ type: 'unknown/action', payload: {} });

    const state = store.getState();
    expect(state).toEqual(initialState);
});

test('should handle multiple appointments creation', async () => {
    const store = makeStore();
    //store.dispatch(deleteAllAppointmentAsync());

    const secondAppointment = {
        id: '2',
        name: 'Test Appointment 2',
        description: 'Description 2',
        date: new Date().toDateString(),
        time: '11:00',
    };

    await store.dispatch(createAppointmentAsync(mockAppointment));
    expect(store.getState().appointments.list).toHaveLength(1);

    await store.dispatch(createAppointmentAsync(secondAppointment));
    expect(store.getState().appointments.list).toHaveLength(2);
    expect(store.getState().appointments.list).toEqual([mockAppointment, secondAppointment]);
});

test('should handle appointment creation with empty description', async () => {
    const store = makeStore();
    //store.dispatch(deleteAllAppointmentAsync());

    const appointmentWithoutDescription = {
        id: '3',
        name: 'Test Appointment 3',
        description: '',
        date: new Date().toDateString(),
        time: '12:00',
    };

    await store.dispatch(createAppointmentAsync(appointmentWithoutDescription));
    expect(store.getState().appointments.list).toHaveLength(1);
    expect(store.getState().appointments.list[0]).toEqual(appointmentWithoutDescription);
});

test('should maintain appointment order after multiple creations', async () => {
    const store = makeStore();
    //store.dispatch(deleteAllAppointmentAsync());

    const appointments = [
        mockAppointment,
        {
            id: '4',
            name: 'Test Appointment 4',
            description: 'Description 4',
            date: new Date().toDateString(),
            time: '13:00',
        },
        {
            id: '5',
            name: 'Test Appointment 5',
            description: 'Description 5',
            date: new Date().toDateString(),
            time: '14:00',
        }
    ];

    for (const appointment of appointments) {
        await store.dispatch(createAppointmentAsync(appointment));
    }

    expect(store.getState().appointments.list).toHaveLength(3);
    expect(store.getState().appointments.list).toEqual(appointments);
});
