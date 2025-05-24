import React, { useState, useEffect } from "react";
import HabitModal from "./HabitModal";
import { loadHabits, saveHabits } from "../utils/localStorage";

type Habit = {
  id: number | string;
  name: string;
  icon?: string;
  isChecked: boolean;
};

function HabitsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [habitData, setHabitData] = useState<Habit[]>([]);

  // Load habits from local storage when the component mounts
  useEffect(() => {
    setHabitData(loadHabits());
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    saveHabits(habitData);
  }, [habitData]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    // The id from the checkbox is a string, convert to number to match habit.id
    setHabitData((prevHabits) => {
      const updatedHabits = prevHabits.map((habit) =>
        String(habit.id) === id ? { ...habit, isChecked: checked } : habit
      );
      return updatedHabits;
    });
  };

  const handleDelete = (id: number | string): void => {
    setHabitData((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  };

  const handleAddHabit = (newHabit: Habit) => {
    setHabitData((prevHabits) => [...prevHabits, newHabit]);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-amber-50">
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 py-4 md:px-20 border-b border-amber-100/10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-200 tracking-tight">
          Habits DOX
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="py-2 px-6 border border-amber-300 text-amber-50 rounded-xl transition-all duration-300 ease-in-out
                     hover:bg-amber-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
        >
          Add Habit
        </button>
      </div>

      {/* Habits List Section */}
      <div className="mt-8 px-4 md:px-20">
        <h2 className="text-2xl font-semibold text-amber-100 mb-6">
          Your Current Habits
        </h2>

        <div className="grid gap-4">
          {habitData.length > 0 ? (
            habitData.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md transition-all duration-200 ease-in-out
                           hover:shadow-lg hover:bg-gray-700"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{habit?.icon}</span>
                  {/* Make sure the label's htmlFor matches the input's id */}
                  <label
                    htmlFor={`habitCheckbox-${habit.id}`}
                    className="text-xl font-medium text-amber-100 cursor-pointer"
                  >
                    {habit.name}
                  </label>
                  <input
                    type="checkbox"
                    id={`habitCheckbox-${habit.id}`}
                    name="habit"
                    value={habit?.name}
                    checked={habit.isChecked}
                    onChange={handleCheckboxChange}
                    className={`form-checkbox h-5 w-5 text-amber-500 bg-gray-700 border-gray-600 rounded focus:ring-amber-500 cursor-pointer`}
                  />
                </div>
                <button
                  onClick={() => handleDelete(habit.id)}
                  className="p-2 text-md text-white bg-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  aria-label={`Delete ${habit.name}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
            ))
          ) : (
            <p className="text-center text-gray-400 text-lg py-10">
              No habits yet! Click "Add Habit" to get started.
            </p>
          )}
        </div>
      </div>

      {/* Conditional rendering of the modal */}
      {modalOpen && (
        <HabitModal
          onClose={() => setModalOpen(false)}
          onAddHabit={handleAddHabit}
        />
      )}
    </div>
  );
}

export default HabitsPage;
