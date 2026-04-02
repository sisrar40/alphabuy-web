import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaUtensils, FaTag, FaFire, FaClock, FaDollarSign, FaInfoCircle } from "react-icons/fa";
import Badge from "../../components/ui/Badge";

const MealDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { items: mealsItems } = useSelector((state) => state.meals);
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        if (mealsItems?.length > 0) {
            // Robust ID comparison (string comparison)
            const foundMeal = mealsItems.find((m) => String(m.id) === String(id));
            setMeal(foundMeal);
        }
    }, [id, mealsItems]);

    if (!meal) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-gray-200 shadow-sm">
                <FaUtensils className="text-4xl text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-gray-900">Meal not found</h2>
                <button
                    onClick={() => navigate("/admin/meals")}
                    className="mt-4 text-blue-600 font-bold hover:underline"
                >
                    Back to Meals List
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate("/admin/meals")}
                    className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transition-all"
                >
                    <FaArrowLeft />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{meal.mealName || meal.name}</h1>
                    <p className="text-sm text-gray-500 mt-1">View meal plan details</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-4">
                            <FaInfoCircle className="text-blue-600" />
                            Description
                        </h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {meal.description || "No description provided."}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-4">
                            <FaUtensils className="text-orange-600" />
                            Meal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-gray-500 w-32 uppercase tracking-wider">Type:</span>
                                <span className="text-sm font-bold text-gray-900 capitalize">{meal.type || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-gray-500 w-32 uppercase tracking-wider">Park:</span>
                                <span className="text-sm font-bold text-gray-900">{meal.parkName || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-gray-500 w-32 uppercase tracking-wider">Calories:</span>
                                <span className="text-sm font-bold text-gray-900">{meal.calories || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-gray-500 w-32 uppercase tracking-wider">Dietary:</span>
                                <span className="text-sm font-bold text-gray-900 capitalize">{meal.dietary || meal.dietaryType || "Mixed"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-gray-500 w-32 uppercase tracking-wider">Prep Time:</span>
                                <span className="text-sm font-bold text-gray-900">{meal.preparationTime || meal.timing || 0} mins</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-4">
                            <FaDollarSign className="text-green-600" />
                            Pricing Details
                        </h2>
                        <div className="text-center py-4">
                            <p className="text-4xl font-black text-gray-900">₹{meal.price}</p>
                            <p className="text-sm text-gray-500 mt-1 font-bold">Per Person</p>
                        </div>
                        {meal.popular && (
                            <div className="mt-4 p-3 bg-orange-50 rounded-xl flex items-center justify-center gap-2 text-orange-700 font-bold text-sm">
                                <FaFire />
                                Popular Choice
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Quick Actions</h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate(`/admin/meals/edit/${meal.id}`)}
                                className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                            >
                                Edit This Meal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetails;
