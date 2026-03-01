import React, { useState } from "react";
import {
  FaUsers,
  FaArrowRight,
  FaClock,
  FaCalendarAlt,
  FaSun,
  FaCloudSun,
  FaGift,
  FaRegSun,
  FaRegMoon,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa";
import { GiPalmTree } from "react-icons/gi";
import Button from "./ui/Button";

const DateSelectionStep = ({ bookingData, setBookingData, nextStep }) => {
  const [selectedDate, setSelectedDate] = useState(bookingData.date);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [selectedDayType, setSelectedDayType] = useState("weekday");

  // Sample available dates with more realistic data
  const availableDates = [
    "2026-03-27",
    "2026-03-28",
    "2026-03-29",
    "2026-03-30",
    "2026-02-01",
    "2026-10-02",
    "2026-10-03",
    "2026-10-04",
    "2026-10-05",
    "2026-10-06",
    "2026-10-07",
    "2026-10-08",
    "2026-10-09",
    "2026-10-10",
    "2026-10-11",
    "2026-10-12",
    "2026-10-13",
    "2026-10-14",
    "2026-10-15",
    "2026-10-16",
  ];

  // Time slots with availability
  const timeSlots = [
    {
      id: 1,
      time: "09:00 - 12:00",
      label: "Morning Splash",
      icon: <FaRegSun />,
      available: true,
      capacity: "65% Full",
    },
    {
      id: 2,
      time: "12:00 - 15:00",
      label: "Peak Adventure",
      icon: <FaSun />,
      available: true,
      capacity: "85% Full",
    },
    {
      id: 3,
      time: "15:00 - 18:00",
      label: "Evening Wave",
      icon: <FaCloudSun />,
      available: true,
      capacity: "45% Full",
    },
    {
      id: 4,
      time: "18:00 - 21:00",
      label: "Moonlight Swim",
      icon: <FaRegMoon />,
      available: false,
      capacity: "Sold Out",
    },
  ];

  // Pricing data with dynamic rates
  const pricingData = {
    weekday: 899,
    weekend: 1199,
    special: 1099,
    peak: 1299,
    offPeak: 799,
    family: 2499,
  };

  // Weather data for dates
  const weatherData = {
    "2026-09-27": {
      temp: 32,
      condition: "Sunny",
      icon: <FaSun className="text-yellow-400" />,
    },
    "2026-09-28": {
      temp: 31,
      condition: "Partly Cloudy",
      icon: <FaCloudSun className="text-gray-500" />,
    },
    "2026-09-29": {
      temp: 33,
      condition: "Sunny",
      icon: <FaSun className="text-yellow-400" />,
    },
    "2026-09-30": {
      temp: 30,
      condition: "Cloudy",
      icon: <FaCloudSun className="text-gray-500" />,
    },
  };

  // Special events
  const specialEvents = [
    { date: "2026-10-01", event: "Holi Splash Festival", discount: 20 },
    { date: "2026-10-15", event: "Family Fun Day", discount: 15 },
  ];

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Navigate to previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Check if date is available
  const isDateAvailable = (date) => {
    return availableDates.includes(date);
  };

  // Get price for date
  const getPriceForDate = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isPeak =
      dateString.includes("2026-10-") &&
      parseInt(dateString.split("-")[2]) > 10;

    if (isPeak) return pricingData.peak;
    if (isWeekend) return pricingData.weekend;
    return pricingData.weekday;
  };

  // Get special event for date
  const getSpecialEvent = (dateString) => {
    return specialEvents.find((event) => event.date === dateString);
  };

  // Get weather for date
  const getWeatherForDate = (dateString) => {
    return (
      weatherData[dateString] || {
        temp: 30 + Math.floor(Math.random() * 5),
        condition: "Sunny",
        icon: <FaSun className="text-yellow-400" />,
      }
    );
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
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    if (isDateAvailable(dateString)) {
      setSelectedDate(dateString);
      setBookingData((prev) => ({ ...prev, date: dateString }));

      // Reset time slot when date changes
      setSelectedTimeSlot(null);
    }
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (slot) => {
    if (slot.available) {
      setSelectedTimeSlot(slot);
      setBookingData((prev) => ({ ...prev, selectedTime: slot.time }));
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Add empty cells for days before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dateObj = new Date(currentYear, currentMonth, day);
      const isAvailable = isDateAvailable(dateString);
      const isSelected = selectedDate === dateString;
      const isTodayDate = isToday(dateObj);
      const specialEvent = getSpecialEvent(dateString);
      const weather = getWeatherForDate(dateString);

      days.push({
        day,
        date: dateString,
        available: isAvailable,
        selected: isSelected,
        today: isTodayDate,
        price: getPriceForDate(dateString),
        dayName: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
        specialEvent,
        weather,
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
    if (selectedDate && selectedTimeSlot) {
      setBookingData((prev) => ({
        ...prev,
        date: selectedDate,
        selectedTime: selectedTimeSlot.time,
        price: getPriceForDate(selectedDate),
      }));
      nextStep();
    }
  };

  // Calculate savings if special event
  const selectedDateEvent = selectedDate ? getSpecialEvent(selectedDate) : null;
  const selectedDatePrice = selectedDate ? getPriceForDate(selectedDate) : 0;
  const savings = selectedDateEvent
    ? (selectedDatePrice * selectedDateEvent.discount) / 100
    : 0;

  return (
    <div className="bg-white rounded-4xl shadow-2xl overflow-hidden">
      {/* Header with Wave Pattern */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 Q25,20 50,30 T100,30"
              stroke="white"
              fill="none"
              strokeWidth="2"
            />
            <path
              d="M0,50 Q25,40 50,50 T100,50"
              stroke="white"
              fill="none"
              strokeWidth="2"
            />
            <path
              d="M0,70 Q25,60 50,70 T100,70"
              stroke="white"
              fill="none"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
              <FaCalendarAlt className="text-3xl text-white" />
            </div>
            <div>
              <span className="text-white/80 text-sm mb-1 block">
                Step 1 of 4
              </span>
              <h2 className="text-3xl font-bold text-white">
                Choose Your Date
              </h2>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-white/80 text-xs block">Available</span>
              <span className="text-white font-bold">
                {availableDates.length} Dates
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-white/80 text-xs block">Best Price</span>
              <span className="text-white font-bold">
                ₹{pricingData.weekday}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-10">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={prevMonth}
            className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all"
          >
            <FaChevronLeft />
          </button>

          <h3 className="text-2xl font-bold text-gray-900">
            {monthNames[currentMonth]} {currentYear}
          </h3>

          <button
            onClick={nextMonth}
            className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="mb-8">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-bold text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <div key={index}>
                {day ? (
                  <button
                    onClick={() => handleDateSelect(day.day)}
                    disabled={!day.available}
                    className={`w-full p-3 rounded-xl border-2 transition-all relative ${
                      day.selected
                        ? "border-blue-600 bg-blue-50"
                        : day.available
                          ? "border-gray-200 hover:border-blue-400 hover:shadow-md"
                          : "border-gray-100 opacity-40 cursor-not-allowed"
                    }`}
                  >
                    {/* Date Number */}
                    <div className="text-center">
                      <span
                        className={`text-lg font-bold ${
                          day.selected ? "text-blue-600" : "text-gray-900"
                        }`}
                      >
                        {day.day}
                      </span>
                    </div>

                    {/* Weather Icon */}
                    <div className="flex justify-center mt-1">
                      {day.weather.icon}
                    </div>

                    {/* Price */}
                    {day.available && (
                      <div
                        className={`text-xs font-bold mt-1 ${
                          day.selected ? "text-blue-600" : "text-gray-500"
                        }`}
                      >
                        ₹{day.price}
                      </div>
                    )}

                    {/* Special Event Badge */}
                    {day.specialEvent && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[8px] font-bold px-2 py-1 rounded-full shadow-lg">
                        -{day.specialEvent.discount}%
                      </div>
                    )}

                    {/* Today Indicator */}
                    {day.today && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                        <span className="text-[8px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full">
                          Today
                        </span>
                      </div>
                    )}
                  </button>
                ) : (
                  <div className="w-full p-3"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Time Slots Section */}
        {selectedDate && (
          <div className="mb-8 animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Select Time Slot
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleTimeSlotSelect(slot)}
                  disabled={!slot.available}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    selectedTimeSlot?.id === slot.id
                      ? "border-blue-600 bg-blue-50"
                      : slot.available
                        ? "border-gray-200 hover:border-blue-400"
                        : "border-gray-100 opacity-40 cursor-not-allowed"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`text-2xl mb-2 ${
                        selectedTimeSlot?.id === slot.id
                          ? "text-blue-600"
                          : "text-gray-600"
                      }`}
                    >
                      {slot.icon}
                    </div>
                    <span className="text-xs font-bold text-gray-900">
                      {slot.label}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      {slot.time}
                    </span>
                    <span
                      className={`text-[10px] font-bold mt-2 px-2 py-1 rounded-full ${
                        slot.available
                          ? slot.capacity.includes("85")
                            ? "bg-orange-100 text-orange-600"
                            : "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {slot.capacity}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Date Summary */}
        {selectedDate && selectedTimeSlot && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <FaCalendarAlt className="text-2xl text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Your Selection</p>
                  <p className="font-bold text-gray-900">
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedTimeSlot.time}
                  </p>

                  {/* Special Event Banner */}
                  {selectedDateEvent && (
                    <div className="flex items-center gap-2 mt-2">
                      <FaGift className="text-orange-500" />
                      <span className="text-xs font-bold text-orange-600">
                        {selectedDateEvent.event} • Save{" "}
                        {selectedDateEvent.discount}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Total</p>
                <p className="text-3xl font-bold text-blue-600">
                  ₹{selectedDatePrice}
                </p>
                {savings > 0 && (
                  <p className="text-xs text-green-600">You save ₹{savings}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Park Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <GiPalmTree className="text-2xl text-green-600" />
            <div>
              <div className="text-xs text-gray-500">Location</div>
              <div className="font-bold text-gray-900">AquaZen Paradise</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <FaClock className="text-2xl text-blue-600" />
            <div>
              <div className="text-xs text-gray-500">Operating Hours</div>
              <div className="font-bold text-gray-900">10:00 AM - 8:00 PM</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <FaUsers className="text-2xl text-purple-600" />
            <div>
              <div className="text-xs text-gray-500">Current Capacity</div>
              <div className="font-bold text-gray-900">65% Full</div>
            </div>
          </div>
        </div>

        {/* Pricing Legend */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
            <span className="text-gray-600">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-400 rounded"></div>
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <span className="text-gray-600">Unavailable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-gray-600">Special Event</span>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTimeSlot}
          className="w-full !py-5 !rounded-2xl text-base font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Ticket Selection
          <FaArrowRight className="ml-2" />
        </Button>

        {/* Guarantee Text */}
        <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-2">
          <FaCheckCircle className="text-green-500" />
          Free cancellation up to 24 hours before visit
        </p>
      </div>
    </div>
  );
};

export default DateSelectionStep;
