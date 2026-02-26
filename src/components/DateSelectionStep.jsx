import React, { useState } from "react";
import {
  FaUsers,
  FaMapMarkerAlt,
  FaArrowRight,
  FaArrowLeft,
  FaClock,
} from "react-icons/fa";

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
    <div className="bg-white rounded-[40px] p-8 md:p-12 border border-gray-50 shadow-soft">
      <div className="flex items-center justify-between mb-12">
        <div>
          <p className="text-[10px] font-black text-aqua-500 uppercase tracking-widest mb-2">Step 1 of 4</p>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight font-display">
            Pick Your Date
          </h2>
        </div>
        <div className="w-16 h-16 bg-aqua-50 rounded-3xl flex items-center justify-center text-aqua-600 text-2xl">
          📅
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={prevMonth}
          className="w-12 h-12 rounded-2xl border border-gray-100 bg-white shadow-soft text-gray-400 hover:text-aqua-600 hover:border-aqua-100 hover:shadow-premium transition-standard flex items-center justify-center group"
        >
          <FaArrowLeft className="text-sm group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <h3 className="text-2xl font-black text-gray-900 tracking-tight">
          {monthNames[currentMonth]} {currentYear}
        </h3>

        <button
          onClick={nextMonth}
          className="w-12 h-12 rounded-2xl border border-gray-100 bg-white shadow-soft text-gray-400 hover:text-aqua-600 hover:border-aqua-100 hover:shadow-premium transition-standard flex items-center justify-center group"
        >
          <FaArrowRight className="text-sm group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="mb-8">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-[10px] font-black text-gray-300 py-2 uppercase tracking-widest"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2 md:gap-3">
          {calendarDays.map((day, index) => (
            <div key={index} className="min-h-[80px] md:min-h-[100px]">
              {day ? (
                <button
                  onClick={() => handleDateSelect(day.day)}
                  disabled={!day.available}
                  className={`w-full h-full p-2 md:p-3 rounded-2xl border-2 text-center transition-standard flex flex-col items-center justify-center relative overflow-hidden ${
                    day.selected
                      ? "border-aqua-500 bg-aqua-50 shadow-premium ring-2 ring-aqua-500/10"
                      : day.today
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-100 bg-white hover:border-aqua-200 hover:shadow-soft"
                  } ${
                    !day.available
                      ? "opacity-30 cursor-not-allowed grayscale"
                      : "cursor-pointer"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider ${
                        day.selected
                          ? "text-aqua-600"
                          : day.today
                          ? "text-blue-500"
                          : "text-gray-300"
                      }`}
                    >
                      {day.dayName}
                    </span>
                    {day.today && (
                      <span className="text-[9px] bg-blue-500 text-white px-1.5 py-0.5 rounded-lg font-black uppercase tracking-wider">
                        Now
                      </span>
                    )}
                  </div>

                  <div
                    className={`text-xl md:text-2xl font-black my-1 ${
                      day.selected
                        ? "text-aqua-700"
                        : day.available
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {day.day}
                  </div>

                  {day.available ? (
                    <div className={`text-[10px] font-black ${
                      day.selected ? "text-aqua-600" : "text-gray-400"
                    }`}>
                      ₹{day.price}
                    </div>
                  ) : (
                    <div className="text-[10px] text-red-400 font-black uppercase tracking-wider mt-1">Full</div>
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
        <div className="bg-aqua-50 border border-aqua-100 rounded-[28px] p-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-soft text-2xl">
              📅
            </div>
            <div>
              <p className="text-[10px] font-black text-aqua-500 uppercase tracking-widest mb-1">Your Adventure Date</p>
              <p className="text-gray-900 font-black text-lg">
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="text-right bg-white p-4 rounded-2xl border border-aqua-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Entry From</p>
            <p className="text-2xl font-black text-aqua-600 tracking-tighter">
              ₹{getPriceForDate(selectedDate)}
            </p>
          </div>
        </div>
      )}

      {/* Park Info Pills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {[
          { icon: <FaClock />, label: "10:00 AM — 8:00 PM" },
          { icon: <FaUsers />, label: "5,000 Visitors / Day" },
          { icon: <FaMapMarkerAlt />, label: "Adventure City" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
            <div className="w-8 h-8 bg-aqua-50 rounded-xl flex items-center justify-center text-aqua-600 text-xs">
              {item.icon}
            </div>
            <span className="text-xs font-black text-gray-600 uppercase tracking-widest">{item.label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={!selectedDate}
        className={`w-full py-5 rounded-[20px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-standard ${
          selectedDate
            ? "bg-aqua-gradient text-white shadow-premium hover:shadow-xl hover:scale-[1.01]"
            : "bg-gray-100 text-gray-300 cursor-not-allowed"
        }`}
      >
        Choose Tickets
        <FaArrowRight />
      </button>
    </div>
  );

};

export default DateSelectionStep;
