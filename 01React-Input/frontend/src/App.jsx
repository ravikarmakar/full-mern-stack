import HabitChecklist from "./components/HabitChecklist";
import Register from "./components/Register";

function App() {
  return (
    <div className="h-screen bg-[#0D1117] text-white">
      {/* <h1 className="text-3xl font-bold text-center py-10">
        Register Your Account
      </h1>
      <Register /> */}
      <HabitChecklist />
    </div>
  );
}

export default App;
