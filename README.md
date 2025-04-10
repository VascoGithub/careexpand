# CareExpand Appointments Module

This project is a part of the **CareExpand** application, focusing on managing appointments. It provides a user-friendly interface to view, search, and manage appointments in both card and list views.

To showcase the error handling, randomly some API requests will fail.

## Features

- **Card and List Views**: Toggle between card and list views for appointments.
- **Search Functionality**: Quickly search for specific appointments.
- **Appointment Management**: Add, edit, and delete appointments.
- **Keyboard Shortcut**: Use `Meta + J` to toggle the appointment form.
- **Keyboard Shortcut**: Use `Meta + R` to create a random appointment.
- **Responsive Design**: Optimized for both desktop and mobile devices. (Although not React Native)
- **Sockets Support**: Having multiple windows open will be synced between each other.

## File Structure

- **`appointments/Appointment.tsx`**: Main component for the appointments UI.
- **`appointments/AppointmentForm.tsx`**: Form for adding or editing appointments.
- **`appointments/AppointmentCard.tsx`**: Card view for displaying appointments.
- **`appointments/AppointmentTable.tsx`**: Table view for displaying appointments.
- **`appointments/AppointmentSearch.tsx`**: Search bar for filtering appointments.
- **`appointments/AppointmentFakeForm.tsx`**: Button to create fake appointments for demonstration purposes.
---
- **`hooks/useKeyboardShortcut.tsx`**: Hook to manage button presses.
- **`hooks/socket.tsx`**: Socket client interface. 
---
- **`lib/appointments/appointmentsAPI.ts`**: Functions to make the API calls
- **`lib/appointments/appointmentsSlice.ts`**: Redux slice where the appointment reduces/stores/selectors are defined
---

- **`lib/createAppSlice.tsx`**: Function to create an async thunks slice, allowing to make async API calls.
- **`lib/utils.tsx`**: Utilities functions.
---


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vascoGithub/careexpand.git
   cd careexpand
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

4. Start the socket development server:
   ```bash
   cd server
   bun server.js
   ```

5. Open the app in your browser at `http://localhost:3000`.

## Usage

- Navigate to the **Appointments** section to view and manage appointments.
- Use the toggle button to switch between card and list views.
- Right-click on an appointment to edit or delete it.
- Use the search bar to filter appointments by keywords.

## Keyboard Shortcuts

- **Meta + J**: Toggle the appointment form.
- **Meta + R**: Create a random appointment.

## Technologies Used

- **React/NextJS**: Frontend framework.
- **TypeScript**: For type safety.
- **Redux Toolkit**: State management.
- **Tailwind CSS**: Styling.
- **Lucide Icons**: Icon library.
- **ShadCN UI**: UI library.

## Improvment

   - More extensive jest tests.
   - React Native support.
   - Authentication System.
   - Profile Managment.
   - Drag and Drop with columns to move appoints from more important to less (like jira).

## How it originated

Executed [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) to bootstrap the example:

```bash
npx create-next-app --example with-redux with-redux-app
```