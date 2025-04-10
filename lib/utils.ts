import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const appointmentTitles = [
  { title: "General Consultation", description: "A standard consultation to discuss general health concerns." },
  { title: "Dental Checkup", description: "A routine dental examination to ensure oral health." },
  { title: "Eye Examination", description: "A comprehensive eye checkup to assess vision and eye health." },
  { title: "Physical Therapy Session", description: "A session to improve mobility and manage pain through physical therapy." },
  { title: "Nutrition Counseling", description: "A consultation to create a personalized nutrition plan." },
  { title: "Mental Health Counseling", description: "A session to discuss and address mental health concerns." },
  { title: "Pediatric Checkup", description: "A routine health checkup for children." },
  { title: "Vaccination Appointment", description: "An appointment to receive necessary vaccinations." },
  { title: "Follow-Up Visit", description: "A follow-up appointment to review ongoing treatment or progress." },
  { title: "Specialist Consultation", description: "A consultation with a specialist for specific health concerns." },
];

export function getRandomAppointment() {
  const randomIndex = Math.floor(Math.random() * appointmentTitles.length);
  return appointmentTitles[randomIndex];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUUID(): string {
  return (1e3 + 4e3 + 8e3 + 1e11).toString().replace(/[018]/g, (c) =>
    ((parseInt(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 6 >> parseInt(c) / 2) || 0).toString(16)
  );
}