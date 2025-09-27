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
    "2025-09-27",
    "2025-09-28",
    "2025-09-29",
    "2025-09-30",
    "2025-10-01",
    "2025-10-02",
    "2025-10-05",
    "2025-10-06",
    "2025-10-07",
    "2025-10-08",
    "2025-10-09",
    "2025-10-12",
    "2025-10-13",
    "2025-10-14",
    "2025-10-15",
    "2025-10-16",
    "2025-10-19",
    "2025-10-20",
    "2025-10-21",
    "2025-10-22",
    "2025-10-23",
    "2025-10-26",
    "2025-10-27",
    "2025-10-28",
    "2025-10-29",
    "2025-10-30",
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
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <h2 className="text-2xl font-bold text-white mb-6">
        Select Your Visit Date
      </h2>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg border cursor-pointer border-gray-600 hover:border-green-400 text-white hover:text-green-400 transition-colors"
        >
          <FaArrowLeft className="text-lg" />
        </button>

        <h3 className="text-xl font-bold text-white">
          {monthNames[currentMonth]} {currentYear}
        </h3>

        <button
          onClick={nextMonth}
          className="p-2 rounded-lg border cursor-pointer border-gray-600 hover:border-green-400 text-white hover:text-green-400 transition-colors"
        >
          <FaArrowRight className="text-lg" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="mb-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <div key={index} className="min-h-[80px]">
              {day ? (
                <button
                  onClick={() => handleDateSelect(day.day)}
                  disabled={!day.available}
                  className={`w-full h-full p-2 rounded-lg border-2 text-center transition-all flex flex-col items-center justify-center ${
                    day.selected
                      ? "border-green-600 bg-green-400/20"
                      : day.today
                      ? "border-blue-500 bg-blue-400/10"
                      : "border-gray-600 hover:border-green-400"
                  } ${
                    !day.available
                      ? "opacity-30 cursor-not-allowed grayscale"
                      : "hover:bg-gray-700/50 cursor-pointer"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span
                      className={`text-xs font-medium ${
                        day.selected
                          ? "text-green-400"
                          : day.today
                          ? "text-blue-400"
                          : "text-gray-400"
                      }`}
                    >
                      {day.dayName}
                    </span>
                    {day.today && (
                      <span className="text-xs bg-blue-500 text-white px-1 rounded">
                        Today
                      </span>
                    )}
                  </div>

                  <div
                    className={`text-lg font-bold ${
                      day.selected
                        ? "text-white"
                        : day.available
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {day.day}
                  </div>

                  {day.available ? (
                    <div className="text-xs font-semibold text-green-400 mt-1">
                      ₹{day.price}
                    </div>
                  ) : (
                    <div className="text-xs text-red-400 mt-1">Sold Out</div>
                  )}
                </button>
              ) : (
                <div className="w-full h-full p-2 opacity-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Date Info */}
      {selectedDate && (
        <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-green-400">Selected Date</h4>
              <p className="text-white">
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Price</p>
              <p className="text-xl font-bold text-green-400">
                ₹{getPriceForDate(selectedDate)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Park Information */}
      <div className="bg-blue-900/20 rounded-lg p-4 mb-6 border border-blue-700/30">
        <h3 className="font-semibold text-blue-300 mb-2">Park Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-200">
          <div className="flex items-center">
            <FaClock className="mr-2" />
            Timing: 10:00 AM - 8:00 PM
          </div>
          <div className="flex items-center">
            <FaUsers className="mr-2" />
            Capacity: 5000 visitors/day
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            Location: Adventure City
          </div>
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!selectedDate}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition duration-300 flex items-center justify-center"
      >
        Continue to Tickets
        <FaArrowRight className="ml-2" />
      </button>
    </div>
  );
};

export default DateSelectionStep;
