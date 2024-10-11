import React from 'react';
import { Appointment } from '../types/appointment';

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  const sortedAppointments = [...appointments].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">预约列表</h2>
      {sortedAppointments.length === 0 ? (
        <p className="text-gray-500">暂无预约</p>
      ) : (
        <ul className="space-y-2">
          {sortedAppointments.map((appointment) => (
            <li key={appointment.id} className="bg-gray-50 p-3 rounded-md">
              <div className="font-semibold">{appointment.name}</div>
              <div className="text-sm text-gray-600">
                {appointment.date.toLocaleDateString()} {appointment.startTime} - {appointment.endTime}
              </div>
              <div className="text-sm text-gray-600">{appointment.email}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentList;