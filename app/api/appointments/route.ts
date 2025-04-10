import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';

interface Appointment {
  id: string;
  name: string;
  date: string;
  time: string;
  description: string;
}

const ERRORS_ENABLED = false;

export async function POST(request: NextRequest) {
  // name, date, time, description
  const body: { id: string, name: string, date: string, time: string, description: string } = await request.json();
  const { id, name, date, time, description } = body;

  try {
    const appointments = await readAppointments();
    const existingIndex = appointments.findIndex((appointment) => appointment.id === id);

    if (existingIndex !== -1) {
      appointments[existingIndex] = { id, name, date, time, description };
    } else {
      appointments.push({ id, name, date, time, description });
    }

    //forced error
    if (ERRORS_ENABLED) {
      if (Math.random() < 1 / 3) {
        throw new Error();
      }
    }


    await writeAppointments(appointments);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ data: { id, name, date, time, description } });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create appointment." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  try {
    const appointments = await readAppointments();
    const appointmentIndex = appointments.findIndex((appointment) => appointment.id === id);

    //forced error
    if (ERRORS_ENABLED) {
      if (Math.random() < 1 / 3) {
        throw new Error();
      }
    }

    if (appointmentIndex === -1) {
      return NextResponse.json(
        { message: "Appointment not found." },
        { status: 404 }
      );
    }

    const deletedAppointment = appointments.splice(appointmentIndex, 1)[0];

    await writeAppointments(appointments);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { data: deletedAppointment },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete appointment." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  try {
    const appointments = await readAppointments();

    if (name) {
      const filteredAppointments = appointments.filter((appointment) =>
        appointment.name.toLowerCase().includes(name.toLowerCase())
      );
      return NextResponse.json({ data: filteredAppointments });
    }

    return NextResponse.json({ data: appointments });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve appointments." },
      { status: 500 }
    );
  }
}

/**
 * 
 * SECTION FOR FILE MANAGER TO MOCK DATABASE ON SERVER
 * 
 */

const APPOINTMENTS_FILE = path.join(process.cwd(), 'data', 'appointments.json');

async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch (error) {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function readAppointments(): Promise<Appointment[]> {
  try {
    await ensureDataDirectory();

    try {
      const data = await fs.readFile(APPOINTMENTS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  } catch (error) {
    console.error('Error reading appointments:', error);
    return [];
  }
}

async function writeAppointments(appointments: Appointment[]) {
  try {
    await ensureDataDirectory();
    await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing appointments:', error);
    throw error;
  }
}