import React from "react";

function Button({ onClick, children, className = "" }) {
  return (
    <button
      className={`w-full py-4 px-6 cursor-pointer rounded-2xl text-base font-bold transition-all duration-300 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white shadow-sm hover:shadow-green-600/20 active:scale-95 flex items-center justify-center gap-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
