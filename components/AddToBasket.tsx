"use client";

import { Product } from "@/sanity.types";
import useBasketStore from "@/store/store";
import { useEffect, useState } from "react";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);

  const [isClient, setIsClient] = useState(false);

  // Use useEffect to set isClient to true after component mounts
  // This ensures that the component only renders on the client-side,
  // preventing hydration errors due to server/client missmatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => removeItem(product._id)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 ${itemCount === 0 ? "bg-slate-100 text-slate-300 cursor-not-allowed" : "bg-white hover:bg-[#E0F2FE] hover:text-[#0284C7] text-slate-800 border border-[#BAE6FD]"}`}
        disabled={itemCount === 0 || disabled}
      >
        <span className="text-lg font-bold leading-none">-</span>
      </button>
      <span className="w-8 text-center font-mono font-bold text-slate-900">
        {itemCount}
      </span>
      <button
        onClick={() => addItem(product)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 shadow-sm ${disabled ? "bg-slate-300 cursor-not-allowed" : "bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:opacity-95 text-white shadow-sky-500/30 hover:scale-105"}`}
        disabled={disabled}
      >
        <span className="text-lg font-bold leading-none">+</span>
      </button>
    </div>
  );
}

export default AddToBasketButton;
