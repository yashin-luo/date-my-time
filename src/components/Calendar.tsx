import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    if (newDate >= today) {
      setCurrentDate(newDate);
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    if (date >= today) {
      setSelectedDate(date);
      onDateSelect(date);
    }
  };

  const isDateSelected = (date: Date) => {
    return selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  const isToday = (date: Date) => {
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isPastDate = (date: Date) => {
    return date < today;
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isSelected = isDateSelected(date);
      const isTodayDate = isToday(date);
      const isPast = isPastDate(date);
      days.push(
        <button
          key={i}
          onClick={() => handleDateClick(date)}
          disabled={isPast}
          className={`p-2 w-10 h-10 rounded-full transition-colors duration-200 ${
            isSelected
              ? 'bg-cyan-500 text-white font-bold'
              : isTodayDate
              ? 'bg-yellow-200 font-bold'
              : isPast
              ? 'text-gray-400 cursor-not-allowed'
              : 'hover:bg-cyan-100'
          }`}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handlePrevMonth} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          disabled={currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="text-lg font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-500 mb-2">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;