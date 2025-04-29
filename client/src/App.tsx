import "./App.css";
import confetti from "canvas-confetti";

function App() {
  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <h1
        className="text-3xl font-bold underline cursor-pointer"
        onClick={handleConfetti}
      >
        Hello world!
      </h1>
    </div>
  );
}

export default App;
