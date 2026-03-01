import React, { useState } from "react";
import {
  FaUsers,
  FaMapMarkerAlt,
  FaArrowRight,
  FaArrowLeft,
  FaClock,
  FaCalendarAlt,
  FaCheck
} from "react-icons/fa";
import Button from "./ui/Button";

// Step 1: Date Selection
const DateSelectionStep = ({ bookingData, setBookingData, nextStep }) => {
  const [selectedDate, setSelectedDate] = useState(bookingData.date);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Sample available dates - you can replace this with your actual data
  const availableDates = [
    "2026-09-27",
    "2026-09-28",
    "2026-09-29",
    "2026-09-30",
    "2026-10-01",
    "2026-10-02",
    "2026-02-05",
    "2026-02-06",
    "2026-02-07",
    "2026-02-08",
    "2026-02-09",
    "2026-02-12",
    "2026-02-13",
    "2026-02-14",
    "2026-02-15",
    "2026-02-16",
    "2026-02-19",
    "2026-02-20",
    "2026-02-21",
    "2026-02-22",
    "2026-02-23",
    "2026-02-26",
    "2026-02-27",
    "2026-02-28",
    "2026-02-29",
    "2026-02-30",
  ];

  // Sample pricing data
  const pricingData = {
    weekday: 899,
    weekend: 1199,
    special: 1099,
  };

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear(currentYear - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear(currentYear + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Check if date is available
  const isDateAvailable = (date) => {
    return availableDates.includes(date);
  };

  // Get price for date
  const getPriceForDate = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();

    // Saturday (6) or Sunday (0) are weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return pricingData.weekend;
    }
    return pricingData.weekday;
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(date).padStart(2, "0")}`;
    if (isDateAvailable(dateString)) {
      setSelectedDate(dateString);
      setBookingData((prev) => ({ ...prev, date: dateString }));
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      const dateObj = new Date(currentYear, currentMonth, day);
      const isAvailable = isDateAvailable(dateString);
      const isSelected = selectedDate === dateString;
      const isTodayDate = isToday(dateObj);

      days.push({
        day,
        date: dateString,
        available: isAvailable,
        selected: isSelected,
        today: isTodayDate,
        price: getPriceForDate(dateString),
        dayName: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleContinue = () => {
    if (selectedDate) {
      nextStep();
    }
  };

  return (
    <div className="premium-card p-8 md:p-12 border-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <span className="bg-aqua-100 text-aqua-600 text-[9px] font-bold text-gray-900 uppercase tracking-widest px-5 py-2 rounded-full shadow-sm mb-3 inline-block">Initial Configuration</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight font-display">
            Strategic Date
          </h2>
          <p className="text-gray-400 font-medium text-sm mt-2">Select your ideal splash window for the ultimate adventure.</p>
        </div>
        <div className="w-20 h-20 bg-premium-gradient rounded-[28px] flex items-center justify-center text-white text-3xl shadow-xl shadow-aqua-500/20">
          <FaCalendarAlt />
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-10 bg-gray-50/50 p-3 rounded-[28px] border border-gray-100/50">
        <button
          onClick={prevMonth}
          className="w-14 h-14 rounded-2xl bg-white shadow-soft text-gray-400 hover:text-aqua-600 border border-transparent hover:border-gray-100 transition-standard flex items-center justify-center group active:scale-95"
        >
          <FaArrowLeft className="text-xs group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <h3 className="text-2xl font-bold text-gray-900 tracking-tight font-display">
          {monthNames[currentMonth]} {currentYear}
        </h3>

        <button
          onClick={nextMonth}
          className="w-14 h-14 rounded-2xl bg-white shadow-soft text-gray-400 hover:text-aqua-600 border border-transparent hover:border-gray-100 transition-standard flex items-center justify-center group active:scale-95"
        >
          <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="mb-10">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-3 mb-6">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-[9px] font-bold text-gray-500 py-2 uppercase tracking-wider"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-3 md:gap-4">
          {calendarDays.map((day, index) => (
            <div key={index} className="min-h-[90px] md:min-h-[110px]">
              {day ? (
                <button
                  onClick={() => handleDateSelect(day.day)}
                  disabled={!day.available}
                  className={`w-full h-full p-4 rounded-[24px] border-2 text-center transition-all duration-500 flex flex-col items-center justify-center relative overflow-hidden group ${
                    day.selected
                      ? "border-aqua-500 bg-white shadow-premium ring-4 ring-aqua-500/10"
                      : day.today
                      ? "border-blue-200 bg-blue-50/30"
                      : "border-gray-50 bg-white hover:border-aqua-100 hover:shadow-soft"
                  } ${
                    !day.available
                      ? "opacity-20 cursor-not-allowed grayscale"
                      : "cursor-pointer"
                  }`}
                >
                  <div className="flex items-center justify-center w-full mb-2">
                    {day.today && (
                      <span className="text-[7px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-sm">
                        Today
                      </span>
                    )}
                  </div>

                  <div
                    className={`text-2xl md:text-3xl font-bold mb-1 font-display transition-colors ${
                      day.selected
                        ? "text-aqua-600"
                        : day.available
                        ? "text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    {day.day}
                  </div>

                  {day.available ? (
                    <div className={`text-[9px] font-bold uppercase tracking-wider ${
                      day.selected ? "text-aqua-500" : "text-gray-500"
                    }`}>
                      ₹{day.price}
                    </div>
                  ) : (
                    <div className="text-[8px] text-red-400 font-bold uppercase tracking-wider">Full</div>
                  )}

                  {day.selected && (
                    <div className="absolute top-0 right-0 w-8 h-8 bg-aqua-500 rounded-bl-2xl flex items-center justify-center text-white text-[10px] shadow-sm animate-in zoom-in duration-300">
                      <FaCheck />
                    </div>
                  )}
                </button>
              ) : (
                <div className="w-full h-full p-2 opacity-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Date Info Banner */}
      {selectedDate && (
        <div className="bg-aqua-50/50 border border-aqua-100 rounded-[32px] p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-64 h-64 bg-aqua-100/30 rounded-full blur-3xl -ml-32 -mt-32 group-hover:bg-aqua-200/40 transition-colors"></div>
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-soft text-aqua-600 text-2xl border border-aqua-100">
               <FaCalendarAlt />
            </div>
            <div>
              <p className="text-[9px] font-bold text-aqua-500 uppercase tracking-widest mb-2 leading-none">Your Target Window</p>
              <p className="text-gray-900 font-bold text-xl lg:text-2xl font-display tracking-tight">
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="text-right bg-white px-8 py-5 rounded-[24px] border border-aqua-100 shadow-soft relative z-10 min-w-[150px]">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Starting Point</p>
            <p className="text-3xl font-bold text-gray-900 tracking-tighter">
              ₹{getPriceForDate(selectedDate)}
            </p>
          </div>
        </div>
      )}

      {/* Park Info Pills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: <FaClock />, label: "Hours: 10:00 — 20:00" },
          { icon: <FaUsers />, label: "Capacity Optimized" },
          { icon: <FaMapMarkerAlt />, label: "Lonavala High-Hill" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-[24px] border border-gray-100 shadow-inner-sm group hover:border-aqua-100 transition-colors">
            <div className="w-10 h-10 bg-aqua-50 rounded-xl flex items-center justify-center text-aqua-600 text-xs shadow-sm group-hover:bg-aqua-100 transition-colors">
              {item.icon}
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{item.label}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={handleContinue}
        disabled={!selectedDate}
        className="w-full !rounded-[28px] !py-6 text-[11px] tracking-widest uppercase shadow-2xl"
      >
        Continue to Tickets
        <FaArrowRight className="text-xs ml-2" />
      </Button>
    </div>
  );
};

export default DateSelectionStep;
