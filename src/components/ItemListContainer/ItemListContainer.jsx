import {
  itemListContainer,
  greetingStyle,
  productsPage,
} from "./itemListContainer.module.css";
import Item from "../Item/Item";

const tempItems = [
  { name: "Black coffee", price: "100" },
  { name: "Decaf", price: "200" },
  { name: "Cafe au liat", price: "300" },
  { name: "Macchiato", price: "400" },
  { name: "Frapuccino", price: "450" },
  { name: "Irish coffee", price: "700" },
  { name: "Coffee sandwich (?)", price: "600" },
  { name: "Surprise Coffee!!!!", price: "1000" },
];

/* eslint-disable react/prop-types */
const ItemListContainer = ({ greeting, counter, setCounter }) => {
  return (
    <div className={productsPage}>
      <div className={greetingStyle}>{greeting}</div>
      <div className={itemListContainer}>
        {tempItems.map((e, i) => (
          <Item
            key={i}
            itemName={e.name}
            itemPrice={e.price}
            cartCounter={counter}
            setCartCounter={setCounter}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
