import React from "react";
import ImageCarousel from "../components/ImageCarousel";
import { dummyProductData, images } from "../dummy/data";
import Product from "../components/Product";

function Landing() {
  return (
    <div>
      <ImageCarousel images={images} />
      {dummyProductData.map((data, index) => {
        <Product
          key={data.id}
          id={data.id}
          title={data.title}
          description={data.description}
          price={data.price}
          discountPercentage={data.discountPercentage}
          rating={data.rating}
          stock={data.stock}
          brand={data.brand}
          category={data.category}
          thumbnail={data.thumbnail}
          images={data.images}
        />;
      })}
    </div>
  );
}

export default Landing;
