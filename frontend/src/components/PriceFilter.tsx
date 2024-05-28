import { useState, useEffect } from "react";

type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice = 100, onChange }: Props) => {
  // Local state for tracking the price while adjusting
  const [tempPrice, setTempPrice] = useState(selectedPrice);

  // Debouncing effect: waits for 300ms after user stops sliding
  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(tempPrice);
    }, 300); // Delay of 300ms

    return () => {
      clearTimeout(handler); // Clears the timer if the user adjusts again
    };
  }, [tempPrice, onChange]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h4 className="text-lg font-semibold mb-4 text-gray-700">
        Max Price: <span className="text-green-600">£{tempPrice}</span>
      </h4>
      <input
        type="range"
        min={10}
        max={500}
        step={10}
        value={tempPrice}
        onChange={(event) => setTempPrice(parseInt(event.target.value))}
        className="w-full h-2 rounded-lg bg-gray-200 appearance-none cursor-pointer accent-green-500
                   transition-all duration-300 ease-in-out hover:bg-gray-300 focus:outline-none"
      />
      <div className="flex justify-between text-sm mt-2 text-gray-500">
        <span>£10</span>
        <span>£500</span>
      </div>
    </div>
  );
};

export default PriceFilter;
