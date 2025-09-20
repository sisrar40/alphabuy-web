import React from "react";
import ImageCarousel from "../components/ImageCarousel";
import { dummyProductData, images, ladiesCategories } from "../dummy/data";
import Product from "../components/Product";
import Categories from "../components/Category";
import MoviePreview from "../components/MoviePreview";

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
      <div className="">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest</h2>

          {/* Horizontal Scrollable Product List */}
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4">
              {dummyProductData.map((product) => (
                <div className="min-w-[250px] sm:min-w-[300px]">
                  <Product key={product.id} {...product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <MoviePreview
          title="Mannu Kya? Karegga"
          posterUrl="https://cdn.cinematerial.com/p/297x/0f5asedz/nocturnal-animals-movie-poster-md.jpg?v=1477478422"
          trailerLabel="Trailer"
          isInterested={true}
          interestCount="165.8K"
          isInCinemas={false}
          duration="2h 21m"
          genres={["Comedy", "Romantic"]}
          languages={["Hindi"]}
          formatTags={["2D"]}
          releaseDate="12 Sep, 2025"
        />
        <br />

        <MoviePreview
          title="Demon Slayer: Infinity Castle"
          posterUrl="https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1"
          trailerLabel="Trailers (7)"
          isInterested={false}
          interestCount="99.3K"
          isInCinemas={true}
          duration="2h 35m"
          genres={["Action", "Adventure", "Anime"]}
          languages={["Japanese", "English", "+3"]}
          formatTags={[
            "2D",
            "ICE",
            "4DX",
            "DOLBY CINEMA 2D",
            "MX4D",
            "IMAX 2D",
          ]}
          rating={{ score: 9.5, votes: "99.3K" }}
          releaseDate="12 Sep, 2025"
        />
      </div>
    </div>
  );
}

export default Landing;
