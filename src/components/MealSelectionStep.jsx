import React, { useState } from "react";
import {
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaUtensils,
  FaCoffee,
  FaIceCream,
  FaHamburger,
  FaLeaf,
  FaCrown,
  FaClock,
  FaWineGlassAlt,
  FaBreadSlice,
  FaCarrot,
  FaApple,
  FaShoppingCart,
  FaChevronDown,
  FaChevronUp,
  FaShieldAlt,
  FaLock,
  FaCheckCircle,
  FaFire,
} from "react-icons/fa";
import { GiMeal, GiPopcorn, GiChipsBag, GiCakeSlice } from "react-icons/gi";
import Button from "./ui/Button";

const MealSelectionStep = ({
  bookingData,
  setBookingData,
  nextStep,
  prevStep,
}) => {
  const [meals, setMeals] = useState(bookingData.meals || []);
  const [showDetails, setShowDetails] = useState({});
  const [mealPreferences, setMealPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    nutFree: false,
  });

  const toggleDetails = (mealId) => {
    setShowDetails((prev) => ({
      ...prev,
      [mealId]: !prev[mealId],
    }));
  };

  const togglePreference = (pref) => {
    setMealPreferences((prev) => ({
      ...prev,
      [pref]: !prev[pref],
    }));
  };

  const mealPlans = [
    {
      id: "breakfast",
      name: "Sunrise Breakfast",
      description: "Morning Fuel",
      price: 199,
      originalPrice: 249,
      discount: "20% OFF",
      features: [
        "Continental Breakfast Buffet",
        "Fresh Fruits & Juices",
        "Tea/Coffee Unlimited",
        "Pastries & Croissants",
        "Live Omelette Station",
      ],
      popular: false,
      icon: <FaCoffee className="text-amber-600" />,
      color: "from-amber-500 to-orange-500",
      bgColor: "amber",
      timing: "8:00 AM - 10:30 AM",
      cuisine: "Continental",
      calories: "450-600 kcal",
      dietary: ["Vegetarian Options", "Gluten-Free Available"],
    },
    {
      id: "lunch",
      name: "Splash Lunch Buffet",
      description: "Mid-Day Feast",
      price: 399,
      originalPrice: 499,
      discount: "20% OFF",
      features: [
        "Multi-Cuisine Buffet",
        "Live Pasta Counter",
        "Unlimited Soft Drinks",
        "Fresh Salad Bar",
        "Indian & Asian Specialties",
      ],
      popular: true,
      icon: <FaHamburger className="text-red-600" />,
      color: "from-red-500 to-red-600",
      bgColor: "red",
      timing: "12:00 PM - 3:00 PM",
      cuisine: "Multi-Cuisine",
      calories: "600-800 kcal",
      dietary: ["Veg & Non-Veg", "Gluten-Free Options"],
    },
    {
      id: "dinner",
      name: "Sunset Dinner",
      description: "Evening Delight",
      price: 499,
      originalPrice: 649,
      discount: "23% OFF",
      features: [
        "Premium Dinner Buffet",
        "Live Grill Station",
        "International Cuisine",
        "Premium Desserts",
        "Mocktails Included",
      ],
      popular: false,
      icon: <GiMeal className="text-purple-600" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "purple",
      timing: "7:00 PM - 10:00 PM",
      cuisine: "International",
      calories: "700-900 kcal",
      dietary: ["Vegan Options", "Halal Available"],
    },
    {
      id: "snacks",
      name: "Snack Pass",
      description: "All-Day Munchies",
      price: 299,
      originalPrice: 399,
      discount: "25% OFF",
      features: [
        "Unlimited Snacks",
        "Ice Cream Counter",
        "Fresh Juices",
        "Popcorn & Nachos",
        "5 Redemption Points",
      ],
      popular: false,
      icon: <GiPopcorn className="text-yellow-600" />,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "yellow",
      timing: "All Day Access",
      cuisine: "Snacks & Beverages",
      calories: "300-500 kcal",
      dietary: ["Vegetarian", "Nut-Free Options"],
    },
    {
      id: "family",
      name: "Family Feast",
      description: "Perfect for 4",
      price: 1499,
      originalPrice: 1899,
      discount: "21% OFF",
      features: [
        "Family Portion Meals",
        "Kids Special Menu",
        "Celebration Cake",
        "4 Soft Drinks",
        "Priority Seating",
      ],
      popular: true,
      icon: <GiCakeSlice className="text-pink-600" />,
      color: "from-pink-500 to-pink-600",
      bgColor: "pink",
      timing: "Any Time Slot",
      cuisine: "Family Style",
      calories: "Per Person",
      dietary: ["Kids Friendly", "Customizable"],
    },
    {
      id: "premium",
      name: "Gourmet Experience",
      description: "Chef's Special",
      price: 999,
      originalPrice: 1299,
      discount: "23% OFF",
      features: [
        "5-Course Gourmet Meal",
        "Chef's Special Menu",
        "Premium Wine/Beer",
        "Private Dining Area",
        "Souvenir Recipe Card",
      ],
      popular: false,
      icon: <FaCrown className="text-amber-600" />,
      color: "from-amber-500 to-amber-600",
      bgColor: "amber",
      timing: "Reserved Slots",
      cuisine: "Gourmet Fusion",
      calories: "800-1000 kcal",
      dietary: ["Custom Dietary", "Premium Service"],
    },
  ];

  const addOns = [
    { id: "cake", name: "Celebration Cake", price: 399, icon: <GiCakeSlice /> },
    {
      id: "mocktail",
      name: "Mocktail Pitcher",
      price: 199,
      icon: <FaWineGlassAlt />,
    },
    {
      id: "icecream",
      name: "Premium Ice Cream",
      price: 99,
      icon: <FaIceCream />,
    },
    { id: "fruit", name: "Fruit Platter", price: 149, icon: <FaApple /> },
  ];

  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const toggleMeal = (mealId) => {
    const updatedMeals = meals.includes(mealId)
      ? meals.filter((id) => id !== mealId)
      : [...meals, mealId];

    setMeals(updatedMeals);
    setBookingData((prev) => ({ ...prev, meals: updatedMeals }));
  };

  const toggleAddOn = (addOnId) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId],
    );
  };

  const selectedMealsTotal = meals.reduce((total, mealId) => {
    const meal = mealPlans.find((m) => m.id === mealId);
    return total + (meal ? meal.price : 0);
  }, 0);

  const selectedAddOnsTotal = selectedAddOns.reduce((total, addOnId) => {
    const addOn = addOns.find((a) => a.id === addOnId);
    return total + (addOn ? addOn.price : 0);
  }, 0);

  const totalAmount = selectedMealsTotal + selectedAddOnsTotal;

  const getBgColorClass = (color) => {
    const colors = {
      amber: "from-amber-50 to-amber-100/50",
      red: "from-red-50 to-red-100/50",
      purple: "from-purple-50 to-purple-100/50",
      yellow: "from-yellow-50 to-yellow-100/50",
      pink: "from-pink-50 to-pink-100/50",
    };
    return colors[color] || "from-gray-50 to-gray-100/50";
  };

  return (
    <div className="bg-white rounded-4xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-600 to-amber-600 p-8 relative overflow-hidden">
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
          </svg>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
              <FaUtensils className="text-3xl text-white" />
            </div>
            <div>
              <span className="text-white/80 text-sm mb-1 block">
                Step 3 of 4
              </span>
              <h2 className="text-3xl font-bold text-white">
                Enhance with Meals
              </h2>
            </div>
          </div>

          <button
            onClick={prevStep}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all"
          >
            <FaArrowLeft className="text-sm" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
      </div>

      <div className="p-8 md:p-10">
        {/* Dietary Preferences */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-900 mb-3">
            Dietary Preferences
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "vegetarian", label: "Vegetarian", icon: <FaLeaf /> },
              { id: "vegan", label: "Vegan", icon: <FaCarrot /> },
              {
                id: "glutenFree",
                label: "Gluten Free",
                icon: <FaBreadSlice />,
              },
              { id: "nutFree", label: "Nut Free", icon: <GiChipsBag /> },
            ].map((pref) => (
              <button
                key={pref.id}
                onClick={() => togglePreference(pref.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  mealPreferences[pref.id]
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {pref.icon}
                {pref.label}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mealPlans.map((meal) => {
            const isSelected = meals.includes(meal.id);

            return (
              <div
                key={meal.id}
                className={`group relative bg-gradient-to-br ${getBgColorClass(meal.bgColor)} rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "ring-4 ring-orange-500/20 shadow-2xl scale-[1.02]"
                    : "hover:shadow-xl hover:-translate-y-1"
                }`}
                onClick={() => toggleMeal(meal.id)}
              >
                {/* Popular Badge */}
                {meal.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                      <FaFire className="text-yellow-300" />
                      Best Seller
                    </span>
                  </div>
                )}

                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {meal.discount}
                  </span>
                </div>

                <div className="p-6">
                  {/* Icon and Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${meal.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}
                    >
                      {meal.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{meal.name}</h3>
                      <p className="text-xs text-gray-500">
                        {meal.description}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ₹{meal.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{meal.originalPrice}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{meal.timing}</p>
                  </div>

                  {/* Quick Features */}
                  <div className="space-y-2 mb-4">
                    {meal.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <FaCheck className="text-green-500 text-xs flex-shrink-0" />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* View Details Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDetails(meal.id);
                    }}
                    className="flex items-center gap-1 text-orange-600 text-xs font-medium mb-4 hover:underline"
                  >
                    <span>View all features</span>
                    {showDetails[meal.id] ? (
                      <FaChevronUp className="text-xs" />
                    ) : (
                      <FaChevronDown className="text-xs" />
                    )}
                  </button>

                  {/* Detailed Features */}
                  {showDetails[meal.id] && (
                    <div className="mb-4 p-4 bg-white/80 rounded-xl animate-in slide-in-from-top-2 duration-300">
                      <h4 className="text-xs font-bold text-gray-900 mb-2">
                        Full Menu Includes:
                      </h4>
                      <ul className="space-y-2">
                        {meal.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-gray-600"
                          >
                            <FaCheckCircle className="text-orange-500 text-xs mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-gray-500">Cuisine</p>
                          <p className="text-xs font-bold">{meal.cuisine}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Calories</p>
                          <p className="text-xs font-bold">{meal.calories}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Selection Indicator */}
                  <div
                    className={`text-center py-3 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isSelected ? "✓ Selected" : "Click to Add"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-ons Section */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-900 mb-4">
            Add-on Treats
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {addOns.map((addOn) => {
              const isSelected = selectedAddOns.includes(addOn.id);
              return (
                <button
                  key={addOn.id}
                  onClick={() => toggleAddOn(addOn.id)}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/30"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`text-2xl mb-2 ${isSelected ? "text-orange-600" : "text-gray-600"}`}
                    >
                      {addOn.icon}
                    </div>
                    <span className="text-xs font-bold text-gray-900">
                      {addOn.name}
                    </span>
                    <span className="text-sm font-bold text-orange-600 mt-1">
                      ₹{addOn.price}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        {(meals.length > 0 || selectedAddOns.length > 0) && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-6 mb-8 animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaShoppingCart className="text-orange-600" />
              Your Selections
            </h3>

            {/* Meals */}
            {meals.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-bold text-gray-700 mb-2">
                  Meal Plans
                </h4>
                {meals.map((mealId) => {
                  const meal = mealPlans.find((m) => m.id === mealId);
                  return meal ? (
                    <div
                      key={meal.id}
                      className="flex justify-between items-center py-2 border-b border-orange-200/50"
                    >
                      <span className="text-sm text-gray-700">{meal.name}</span>
                      <span className="font-bold text-gray-900">
                        ₹{meal.price}
                      </span>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            {/* Add-ons */}
            {selectedAddOns.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-bold text-gray-700 mb-2">
                  Add-ons
                </h4>
                {selectedAddOns.map((addOnId) => {
                  const addOn = addOns.find((a) => a.id === addOnId);
                  return addOn ? (
                    <div
                      key={addOn.id}
                      className="flex justify-between items-center py-2 border-b border-orange-200/50"
                    >
                      <span className="text-sm text-gray-700">
                        {addOn.name}
                      </span>
                      <span className="font-bold text-gray-900">
                        ₹{addOn.price}
                      </span>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t-2 border-orange-200">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-orange-600">
                ₹{totalAmount}
              </span>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Button
            variant="secondary"
            onClick={prevStep}
            className="flex-1 !py-5 !rounded-2xl text-sm font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Back to Tickets
          </Button>
          <Button
            onClick={nextStep}
            className="flex-[2] !py-5 !rounded-2xl text-sm font-bold bg-gradient-to-r from-orange-600 to-amber-500"
          >
            Continue to Payment
            <FaArrowRight className="ml-2" />
          </Button>
        </div>

        {/* Guarantee */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FaShieldAlt className="text-green-500" />
            Freshly Prepared
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="text-blue-500" />
            Pre-order Guarantee
          </span>
          <span className="flex items-center gap-1">
            <FaLock className="text-purple-500" />
            Hygiene Certified
          </span>
        </div>
      </div>
    </div>
  );
};

export default MealSelectionStep;
