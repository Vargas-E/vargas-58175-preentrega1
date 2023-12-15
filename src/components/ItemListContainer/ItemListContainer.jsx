import {
  itemListContainer,
  productsPage,
} from "./itemListContainer.module.css";
import Item from "../Item/Item";

/* eslint-disable react/prop-types */
const ItemListContainer = ({ products}) => {
  return (
    <div className={productsPage}>
      <div className={itemListContainer}>
        {products.map((e, i) => (
          <Item
            key={i}
            item={e}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
