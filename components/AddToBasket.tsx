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
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150 ${itemCount === 0 ? "bg-stone-100 text-stone-300 cursor-not-allowed" : "bg-stone-100 hover:bg-[#E8F8EA] hover:text-[#03AC0E] text-stone-800 border border-stone-200"}`}
        disabled={itemCount === 0 || disabled}
      >
        <span className="text-lg font-bold leading-none">-</span>
      </button>
      <span className="w-8 text-center font-mono font-bold text-stone-900">{itemCount}</span>
      <button
        onClick={() => addItem(product)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150 shadow-sm ${disabled ? "bg-stone-300 cursor-not-allowed" : "bg-[#03AC0E] hover:bg-[#028A0B] text-white"}`}
        disabled={disabled}
      >
        <span className="text-lg font-bold leading-none">+</span>
      </button>
    </div>
  );
}

export default AddToBasketButton;
