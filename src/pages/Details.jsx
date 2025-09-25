import React from "react";

function Details() {
  return (
    <div className="max-w-7xl mx-auto mt-2 px-4 space-y-6 relative ">
      <div className="w-full h-72 relative">
        <img
          src="https://previews.123rf.com/images/avian/avian1805/avian180500004/100944910-amusement-park-landscape-banner-with-carousels-roller-coaster-and-air-balloon-circus-fun-fair-and.jpg"
          className="h-72 w-full object-cover"
          alt="Details Banner"
        />

        <div className="absolute bottom-[-32%] left-[35px] right-[35px] bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-4 border border-white/20">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <img
                src="https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_1280/c_crop%2Cg_custom%2Fv1756989100%2Fstftuzl5lldacp02z3h1.jpg"
                className="h-40 rounded-xl"
              />
              <div>
                <h2 className="text-lg font-semibold">Details Overview</h2>
                <p className="text-sm text-gray-700">
                  This is a dynamic overlapping box without hardcoded height.
                </p>
              </div>
            </div>

            <div>price button</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
