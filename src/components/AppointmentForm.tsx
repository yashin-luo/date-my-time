import React, { useState, useEffect } from 'react';
import { Appointment } from '../types/appointment';

interface AppointmentFormProps {
  selectedDate: Date | null;
  onSubmit: (appointment: Appointment) => void;
  existingAppointments: Appointment[];
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ selectedDate, onSubmit, existingAppointments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const slots = generateAvailableTimeSlots(selectedDate, existingAppointments);
      setAvailableTimeSlots(slots);
      if (slots.length > 0) {
        setStartTime(slots[0]);
        setEndTime(slots[Math.min(1, slots.length - 1)]);
      }
    }
  }, [selectedDate, existingAppointments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate) {
      const appointment: Appointment = {
        id: Date.now(),
        date: selectedDate,
        startTime,
        endTime,
        name,
        email,
      };
      onSubmit(appointment);
      setName('');
      setEmail('');
      setStartTime('09:00');
      setEndTime('10:00');
    }
  };

  const generateAvailableTimeSlots = (date: Date, appointments: Appointment[]): string[] => {
    const slots: string[] = [];
    const bookedSlots = new Set<string>();

    appointments.forEach(app => {
      if (app.date.toDateString() === date.toDateString()) {
        let current = app.startTime;
        while (current < app.endTime) {
          bookedSlots.add(current);
          current = incrementTime(current, 30);
        }
      }
    });

    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        if (!bookedSlots.has(time)) {
          slots.push(time);
        }
      }
    }

    return slots;
  };

  const incrementTime = (time: string, minutes: number): string => {
    const [hours, mins] = time.split(':').map(Number);
    const date = new Date(0, 0, 0, hours, mins + minutes);
    return date.toTimeString().slice(0, 5);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          姓名
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          邮箱
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
        />
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
            开始时间
          </label>
          <select
            id="startTime"
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
              if (e.target.value >= endTime) {
                setEndTime(incrementTime(e.target.value, 30));
              }
            }}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
          >
            {availableTimeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
            结束时间
          </label>
          <select
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
          >
            {availableTimeSlots.filter((time) => time > startTime).map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={!selectedDate || startTime >= endTime || availableTimeSlots.length === 0}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        预约
      </button>
    </form>
  );
};

export default AppointmentForm;