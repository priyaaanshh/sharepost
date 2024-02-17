import React, { useState } from "react";

const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative w-full overflow-hidden   ">
      {/* Carousel wrapper */}
      <div className="relative h-[300px] sm:h-[400px] ">
        {images?.map((image, index) => {
          return (
            <div className={`${current === index ? "" : "hidden"}`} key={index}>
              <img
                src={images[index]}
                className="absolute object-cover block h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
          );
        })}
      </div>
      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        {images?.map((image, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                current === index ? "bg-white" : "bg-[#fff8]"
              }`}
              onClick={() => setCurrent(index)}
            />
          );
        })}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={() => {
          setCurrent((current) => {
            return (images.length + current - 1) % images.length;
          });
        }}
      >
        <span className="inline-flex items-center justify-center w-5 h-10 rounded-lg bg-slate-800/30 group-hover:bg-slate-800/50 group-focus:ring-2 group-focus:ring-slate-800/60 group-focus:outline-none">
          <svg
            className="w-3 h-3 text-white/80"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={() => {
          setCurrent((current) => {
            return (current + 1) % images.length;
          });
        }}
      >
        <span className="inline-flex items-center justify-center w-5 h-10 rounded-lg bg-slate-800/30 group-hover:bg-slate-800/50 group-focus:ring-2 group-focus:ring-slate-800/60 group-focus:outline-none">
          <svg
            className="w-3 h-3 text-white/80"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
