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
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Add Meal Plans</h2>
        <button
          onClick={prevStep}
          className="flex items-center text-blue-400 hover:text-blue-300"
        >
          <FaArrowLeft className="mr-2" />
          Back to Tickets
        </button>
      </div>

      <p className="text-gray-300 mb-6">
        Enhance your experience with our delicious meal plans (Optional)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {mealPlans.map((meal) => (
          <div
            key={meal.id}
            onClick={() => toggleMeal(meal.id)}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all bg-gray-700/30 backdrop-blur-sm ${
              meals.includes(meal.id)
                ? "border-blue-500 bg-blue-900/20"
                : "border-gray-600 hover:border-blue-400"
            } ${meal.popular ? "ring-2 ring-yellow-200/20" : ""}`}
          >
            {meal.popular && (
              <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full inline-block mb-3">
                RECOMMENDED
              </div>
            )}

            <div className="bg-gray-600 h-24 rounded-lg mb-3 flex items-center justify-center">
              <FaUtensils className="text-3xl text-gray-400" />
            </div>

            <h3 className="font-bold text-lg text-white">{meal.name}</h3>
            <p className="text-gray-300 text-sm mb-2">{meal.description}</p>

            <div className="text-xl font-bold text-green-400 mb-3">
              ₹{meal.price}
            </div>

            <ul className="text-sm text-gray-300 space-y-1 mb-4">
              {meal.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <FaCheck className="text-green-500 mr-2 text-xs" />
                  {feature}
                </li>
              ))}
            </ul>

            <div
              className={`text-center py-2 rounded-lg font-semibold ${
                meals.includes(meal.id)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-600 text-gray-300"
              }`}
            >
              {meals.includes(meal.id) ? "Selected" : "Select Plan"}
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-white mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          {meals.map((mealId) => {
            const meal = mealPlans.find((m) => m.id === mealId);
            return meal ? (
              <div key={meal.id} className="flex justify-between text-gray-300">
                <span>{meal.name}</span>
                <span className="text-white">₹{meal.price}</span>
              </div>
            ) : null;
          })}
        </div>
        {meals.length > 0 && (
          <div className="border-t border-gray-600 mt-3 pt-3 flex justify-between font-semibold text-white">
            <span>Meals Total</span>
            <span>₹{selectedMealsTotal}</span>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={prevStep}
          className="flex-1 border border-gray-400 text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-700/50 transition duration-300"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center"
        >
          Continue to Payment
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default MealSelectionStep;
