/* eslint-disable react/prop-types */
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";

/* En el componente products es donde irian otras cosas aparte del container de los productos, por ahora solo tiene el ItemListContainer*/
const Products = ({ counter, setCounter }) => {
  const greeting =
    "Hi this is a placeholer message for the ItemListContainer react component! Click on the counter to add or substract quantity. Press add to cart to change cartCounter! Colors on the card are randomized!";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ItemListContainer
        greeting={greeting}
        counter={counter}
        setCounter={setCounter}
      />
    </div>
  );
};

export default Products;
