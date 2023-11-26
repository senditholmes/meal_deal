import { mains_item_data } from "C:\\Users\\user\\Desktop\\projects\\meal_deal\\meal_deal_scraper\\data\\mains_item_data.ts";
import { useState } from "react";
import { item } from "../types/types";

export const Mains = () => {
  const [mains, setMains] = useState(mains_item_data);
  const [pickedMain, setPickedMain] = useState<item | null>(null);

  const pickRandomMain = () => {
    setPickedMain(mains[Math.floor(Math.random() * mains.length)]); // set picked main using random number index
  };

  return (
    <div id="mains-wrapper">
      {pickedMain ? (
        <div className="mains-results">
          <img src={pickedMain.src} alt="picked-main" />{" "}
          <h1>{pickedMain.itemName}</h1> <p>{pickedMain.price}</p>
        </div>
      ) : (
        <></>
      )}

      <button
        name="shuffle-mains"
        className="shuffle-mains-button"
        onClick={pickRandomMain}
      >
        Choose your main
      </button>
    </div>
  );
};
