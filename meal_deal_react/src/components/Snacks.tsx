import { snacks_item_data } from "C:\\Users\\user\\Desktop\\projects\\meal_deal\\meal_deal_scraper\\data\\snacks_item_data.ts";
import { useState } from "react";
import { item } from "../types/types";

export const Snacks = () => {
  const [snacks, setSnacks] = useState(snacks_item_data);
  const [pickedSnack, setPickedSnack] = useState<item | null>(null);

  const pickRandomSnack = () => {
    setPickedSnack(snacks[Math.floor(Math.random() * snacks.length)]); // set picked main using random number index
  };

  return (
    <div id="snacks-wrapper">
      {pickedSnack ? (
        <div className="mains-results">
          <img src={pickedSnack.src} alt="picked-main" />{" "}
          <h1>{pickedSnack.itemName}</h1> <p>{pickedSnack.price}</p>
        </div>
      ) : (
        <></>
      )}

      <button
        name="shuffle-snacks"
        className="shuffle-snacks-button"
        onClick={pickRandomSnack}
      >
        Choose your snack
      </button>
    </div>
  );
};
