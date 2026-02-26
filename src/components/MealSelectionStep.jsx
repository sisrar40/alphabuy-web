import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft, FaCheck, FaUtensils } from "react-icons/fa";

const MealSelectionStep = ({
  bookingData,
  setBookingData,
  nextStep,
  prevStep,
}) => {
  const [meals, setMeals] = useState(bookingData.meals);

  const mealPlans = [
    {
      id: "basic",
      name: "Basic Meal Plan",
      description: "Lunch + Soft Drink",
      price: 299,
      features: ["Veg/Non-Veg Options", "Complementary Drink", "Dessert"],
      image: "/api/placeholder/200/120",
    },
    {
      id: "premium",
      name: "Premium Meal Plan",
      description: "Lunch + Dinner + Beverages",
      price: 599,
      features: [
        "Multi-cuisine Buffet",
        "Unlimited Beverages",
        "Premium Desserts",
      ],
      popular: true,
      image: "/api/placeholder/200/120",
    },
    {
      id: "family",
      name: "Family Pack",
      description: "For 4 people",
      price: 1999,
      features: [
        "Family-sized portions",
        "Special Kids Menu",
        "Complimentary Cake",
      ],
      image: "/api/placeholder/200/120",
    },
  ];

  const toggleMeal = (mealId) => {
    const updatedMeals = meals.includes(mealId)
      ? meals.filter((id) => id !== mealId)
      : [...meals, mealId];

    setMeals(updatedMeals);
    setBookingData((prev) => ({ ...prev, meals: updatedMeals }));
  };

  const selectedMealsTotal = meals.reduce((total, mealId) => {
    const meal = mealPlans.find((m) => m.id === mealId);
    return total + (meal ? meal.price : 0);
  }, 0);

  return (
    <div className="bg-white rounded-[40px] p-8 md:p-12 border border-gray-50 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] font-black text-aqua-500 uppercase tracking-widest mb-2">Step 3 of 4</p>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight font-display">Add Meal Plans</h2>
        </div>
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-gray-400 hover:text-aqua-600 font-black text-xs uppercase tracking-widest bg-gray-50 border border-gray-100 px-5 py-3 rounded-2xl transition-standard hover:border-aqua-100"
        >
          <FaArrowLeft className="text-xs" />
          Back to Tickets
        </button>
      </div>

      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-10">
        Elevate your adventure with our curated meal experiences (Optional)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {mealPlans.map((meal) => {
          const isSelected = meals.includes(meal.id);
          return (
            <div
              key={meal.id}
              onClick={() => toggleMeal(meal.id)}
              className={`border-2 rounded-[32px] p-7 cursor-pointer transition-standard bg-white relative overflow-hidden ${
                isSelected
                  ? "border-aqua-400 shadow-premium ring-2 ring-aqua-500/10"
                  : meal.popular
                  ? "border-aqua-200 shadow-soft"
                  : "border-gray-100 shadow-soft hover:border-aqua-100"
              }`}
            >
              {meal.popular && (
                <div className="absolute top-0 right-0 bg-aqua-gradient text-white text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-bl-[24px] shadow-lg">
                  Recommended
                </div>
              )}

              <div className={`h-24 rounded-2xl mb-6 flex items-center justify-center transition-colors ${isSelected ? "bg-aqua-50" : "bg-gray-50"}`}>
                <FaUtensils className={`text-4xl transition-standard ${isSelected ? "text-aqua-500" : "text-gray-300"}`} />
              </div>

              <h3 className="font-black text-lg text-gray-900 mb-1 font-display">{meal.name}</h3>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-5">{meal.description}</p>

              <div className="flex items-baseline mb-5">
                <span className="text-3xl font-black text-gray-900 tracking-tighter">₹{meal.price}</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">/ person</span>
              </div>

              <ul className="space-y-3 mb-6">
                {meal.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-aqua-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCheck className="text-aqua-600 text-[8px]" />
                    </div>
                    <span className="text-xs font-black text-gray-600 uppercase tracking-wider">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className={`text-center py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-standard border ${
                isSelected
                  ? "bg-aqua-gradient text-white border-transparent shadow-premium"
                  : "bg-gray-50 text-gray-400 border-gray-100 hover:border-aqua-100 hover:text-aqua-600"
              }`}>
                {isSelected ? "✓ Selected" : "Select Plan"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Meal Summary */}
      <div className="bg-gray-50/50 border border-gray-100 rounded-[32px] p-8 mb-10">
        <h3 className="font-black text-lg text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 bg-aqua-50 rounded-xl flex items-center justify-center text-sm">🍽️</span>
          Meal Summary
        </h3>
        {meals.length > 0 ? (
          <div className="space-y-4">
            {meals.map((mealId) => {
              const meal = mealPlans.find((m) => m.id === mealId);
              return meal ? (
                <div key={meal.id} className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-sm font-black text-gray-700">{meal.name}</span>
                  <span className="text-sm font-black text-gray-900">₹{meal.price}</span>
                </div>
              ) : null;
            })}
          </div>
        ) : (
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic text-center py-6 border border-dashed border-gray-100 rounded-2xl">
            No meal plans selected
          </p>
        )}
        {meals.length > 0 && (
          <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-100 flex justify-between items-center">
            <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Meals Total</span>
            <span className="text-3xl font-black text-aqua-600 tracking-tighter">₹{selectedMealsTotal}</span>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={prevStep}
          className="flex-1 bg-white border border-gray-100 text-gray-400 py-5 rounded-[20px] font-black text-xs uppercase tracking-widest hover:border-gray-200 hover:text-gray-600 transition-standard shadow-soft"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="flex-[2] bg-aqua-gradient text-white py-5 rounded-[20px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-premium hover:shadow-xl hover:scale-[1.01] transition-standard"
        >
          Proceed to Payment
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default MealSelectionStep;
