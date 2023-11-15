import "./App.css";
import { Snacks } from "./components/Snacks";
import { Drinks } from "./components/Drinks";
import { Mains } from "./components/Mains";

export default function App() {
  return (
    <div className="component-wrapper">
      <Mains />
      <Snacks />
      <Drinks />
    </div>
  );
}
