import React, { useState } from "react";

function HabitModal({ onClose, onAddHabit }) {
  const [habitName, setHabitName] = useState("");
  const [habitIcon, setHabitIcon] = useState("✨"); // Default icon

  const handleAddHabit = () => {
    if (habitName.trim()) {
      // Ensure habit name is not empty
      onAddHabit({
        id: Date.now(), // Simple unique ID (for demonstration)
        name: habitName.trim(),
        icon: habitIcon,
        isChecked: false,
      });
      setHabitName(""); // Clear input after adding
      setHabitIcon("✨"); // Reset icon
      onClose(); // Close the modal
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-0">
      {/* Darker overlay, responsive padding */}
      <div className="relative w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-2xl border border-gray-700">
        {/* Darker modal, subtle border */}
        <h2 className="mb-6 text-3xl font-bold text-amber-200">
          Add New Habit
        </h2>

        {/* Habit Name Input */}
        <div className="mb-4">
          <label
            htmlFor="habitName"
            className="block text-lg font-medium text-amber-100 mb-2"
          >
            Habit Name
          </label>

          <input
            type="text"
            id="habitName"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-amber-50 border border-gray-600
                       focus:border-amber-400 focus:ring-amber-400 focus:outline-none"
            placeholder="e.g., Drink 8 glasses of water"
          />
        </div>

        {/* Habit Icon Selection (Simple dropdown for now) */}
        <div className="mb-6">
          <label
            htmlFor="habitIcon"
            className="block text-lg font-medium text-amber-100 mb-2"
          >
            Choose Icon
          </label>
          <select
            id="habitIcon"
            value={habitIcon}
            onChange={(e) => setHabitIcon(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-amber-50 border border-gray-600
                       focus:border-amber-400 focus:ring-amber-400 focus:outline-none"
          >
            <option value="✨">✨ Sparkle</option>
            <option value="📚">📚 Book</option>
            <option value="💪">💪 Muscle</option>
            <option value="💧">💧 Water</option>
            <option value="🍎">🍎 Apple</option>
            <option value="🧘">🧘 Meditate</option>
            <option value="🏃">🏃 Run</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700
                       focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddHabit}
            className="px-5 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700
                       focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            Add Habit
          </button>
        </div>

        {/* Optional: Close button at top right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 cursor-pointer hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default HabitModal;
