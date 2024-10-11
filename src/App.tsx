import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import Calendar from './components/Calendar';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import { Appointment } from './types/appointment';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAppointmentSubmit = (appointment: Appointment) => {
    setAppointments([...appointments, appointment]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <CalendarIcon className="h-14 w-14 text-cyan-500" />
              <div className="text-2xl font-bold">个人时间预约助手</div>
            </div>
            <div className="divide-y divide-gray-200">
              <Calendar onDateSelect={handleDateSelect} />
              {selectedDate && (
                <div className="pt-4">
                  <p className="text-lg font-semibold text-cyan-600">
                    已选择日期: {selectedDate.toLocaleDateString()}
                  </p>
                  <AppointmentForm 
                    selectedDate={selectedDate} 
                    onSubmit={handleAppointmentSubmit} 
                    existingAppointments={appointments}
                  />
                </div>
              )}
              <AppointmentList appointments={appointments} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;