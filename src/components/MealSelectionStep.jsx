import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft, FaCheck, FaUtensils } from "react-icons/fa";
import Button from "./ui/Button";

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
    <div className="premium-card p-8 md:p-12 border-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-6">
        <div>
          <span className="bg-aqua-100 text-aqua-600 text-[9px] font-bold uppercase tracking-widest px-5 py-2 rounded-full shadow-sm mb-3 inline-block">Sustenance Phase</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight font-display">
            Add Meal Plans
          </h2>
          <p className="text-gray-400 font-medium text-sm mt-2">Elevate your adventure with curated culinary experiences.</p>
        </div>
        <Button
          variant="secondary"
          onClick={prevStep}
          className="!px-8 !py-4 !rounded-2xl text-[10px] tracking-widest uppercase shadow-soft"
        >
          <FaArrowLeft className="text-xs mr-2" />
          Back to Tickets
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-12">
        {mealPlans.map((meal) => {
          const isSelected = meals.includes(meal.id);
          return (
            <div
              key={meal.id}
              onClick={() => toggleMeal(meal.id)}
              className={`rounded-[40px] p-8 cursor-pointer transition-all duration-500 bg-white relative overflow-hidden flex flex-col justify-between border-2 ${
                isSelected
                  ? "border-aqua-500 shadow-premium ring-4 ring-aqua-500/10 scale-[1.02]"
                  : meal.popular
                  ? "border-aqua-100 shadow-soft"
                  : "border-gray-50 shadow-soft hover:border-aqua-100 hover:-translate-y-1"
              }`}
            >
              {meal.popular && (
                <div className="absolute top-0 right-0 bg-premium-gradient text-white text-[9px] font-bold uppercase tracking-wider px-5 py-2 rounded-bl-[24px] shadow-lg shadow-aqua-500/20">
                  Recommended
                </div>
              )}

              <div>
                <div className={`h-28 rounded-[28px] mb-8 flex items-center justify-center transition-all duration-500 ${isSelected ? "bg-aqua-50 shadow-inner-sm text-aqua-600" : "bg-gray-50 text-gray-400"}`}>
                  <FaUtensils className="text-4xl" />
                </div>

                <h3 className="font-bold text-gray-900 tracking-tight">{meal.name}</h3>
                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-6">{meal.description}</p>

                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-gray-900 tracking-tighter">₹{meal.price}</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-3">/ person</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {meal.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <div className="w-6 h-6 bg-aqua-50 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-aqua-100">
                        <FaCheck className="text-aqua-600 text-[9px]" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`text-center py-4 rounded-[20px] font-bold text-[11px] uppercase tracking-wider transition-all duration-500 shadow-sm border ${
                isSelected
                  ? "bg-premium-gradient text-white border-transparent shadow-aqua-500/30"
                  : "bg-gray-50 text-gray-400 border-gray-100 group-hover:bg-white"
              }`}>
                {isSelected ? "✓ Selective" : "Select Plan"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Meal Summary */}
      <div className="bg-gray-50/50 border border-gray-100 rounded-[40px] p-10 mb-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-aqua-100/20 rounded-full blur-3xl -mr-32 -mt-32 transition-colors duration-700 group-hover:bg-aqua-200/30"></div>
        
        <h3 className="font-bold text-xl text-gray-900 mb-8 flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-soft border border-aqua-50">🍽️</div>
          Culinary Manifest
        </h3>
        
        {meals.length > 0 ? (
          <div className="space-y-6 relative z-10">
            {meals.map((mealId) => {
              const meal = mealPlans.find((m) => m.id === mealId);
              return meal ? (
                <div key={meal.id} className="flex justify-between items-center py-4 border-b border-gray-100/50 last:border-0">
                  <span className="text-[11px] font-bold text-gray-900 uppercase tracking-widest flex items-center gap-4">
                     <span className="w-2 h-2 rounded-full bg-aqua-500"></span>
                     {meal.name}
                  </span>
                  <span className="text-xl font-bold text-gray-900 tracking-tight">₹{meal.price}</span>
                </div>
              ) : null;
            })}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-[32px] bg-white/50 relative z-10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">No culinary plans selected yet</p>
          </div>
        )}

        {meals.length > 0 && (
          <div className="mt-8 pt-8 border-t-2 border-dashed border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Aggregate Provision</span>
            <div className="flex items-baseline gap-2">
               <span className="text-sm font-bold text-gray-400 uppercase">INR</span>
               <span className="text-5xl font-bold text-aqua-600 tracking-tighter">₹{selectedMealsTotal}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Button
          variant="secondary"
          onClick={prevStep}
          className="flex-1 !rounded-[28px] !py-6 text-[11px] tracking-widest uppercase shadow-soft"
        >
          Adjust Selections
        </Button>
        <Button
          onClick={nextStep}
          className="flex-[2] !rounded-[28px] !py-6 text-[11px] tracking-widest uppercase shadow-xl"
        >
          Proceed to Payment
          <FaArrowRight className="text-xs ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MealSelectionStep;
