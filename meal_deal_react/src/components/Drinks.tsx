import { drinks_item_data } from "C:\\Users\\user\\Desktop\\meal_deal\\meal_deal_scraper\\data\\drinks_item_data.ts";
import { useState } from "react";
import { item } from "../types/types";

export const Drinks = () => {
  const [drinks, setDrinks] = useState(drinks_item_data);
  const [pickedDrink, setPickedDrink] = useState<item | null>(null);

  const pickRandomDrink = () => {
    setPickedDrink(drinks[Math.floor(Math.random() * drinks.length)]); // set picked main using random number index
  };

  return (
    <div id="snacks-wrapper">
      {pickedDrink ? (
        <div className="mains-results">
          <img src={pickedDrink.src} alt="picked-main" />{" "}
          <h1>{pickedDrink.itemName}</h1> <p>{pickedDrink.price}</p>
        </div>
      ) : (
        <></>
      )}

      <button
        name="shuffle-Drinks"
        className="shuffle-Drinks-button"
        onClick={pickRandomDrink}
      >
        Choose your drink
      </button>
    </div>
  );
};
