import React from "react";

function Button({ onClick, children }) {
  return (
    <button
      className="w-full py-3 px-4 cursor-pointer rounded-xl text-base font-medium transition-all duration-200 border border-green-400 text-green-400 hover:bg-green-400/10"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
