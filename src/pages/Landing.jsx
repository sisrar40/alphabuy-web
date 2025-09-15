import React from "react";
import ImageCarousel from "../components/ImageCarousel";
import { dummyProductData, images, ladiesCategories } from "../dummy/data";
import Product from "../components/Product";
import Categories from "../components/Category";

function Landing() {
  const handleCategoryClick = (slug) => {
    console.log("Category clicked:", slug);
    // Filter or navigate to category page
  };
  return (
    <div>
      <Categories
        categories={ladiesCategories}
        onCategoryClick={handleCategoryClick}
      />
      <ImageCarousel images={images} />
      <div className=" min-h-screen py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest</h2>
          {/* Responsive Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dummyProductData.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
