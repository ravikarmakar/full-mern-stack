export const loadHabits = () => {
  try {
    const serializedHabits = localStorage.getItem("habits");
    if (serializedHabits === null) {
      return [];
    }
    return JSON.parse(serializedHabits);
  } catch (error) {
    console.error("Error loading habits from local storage:", error);
    return [];
  }
};

export const saveHabits = (habits) => {
  try {
    const serializedHabits = JSON.stringify(habits);
    localStorage.setItem("habits", serializedHabits);
  } catch (error) {
    console.error("Error saving habits to local storage:", error);
  }
};
