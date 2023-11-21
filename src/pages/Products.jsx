/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import { useEffect, useState } from "react";
import { productsStyle } from "./products.module.css";
import Loading from "../components/Loading/Loading";

/* En el componente products es donde irian otras cosas aparte del container de los productos, por ahora solo tiene el ItemListContainer*/
const Products = (props) => {
  const params = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (params?.id) {
      fetch("https://dummyjson.com/products/category/" + params.id)
        .then((res) => res.json())
        .then((json) => setProducts(json.products));
    } else {
      fetch("https://dummyjson.com/products?limit=100")
        .then((res) => res.json())
        .then((json) => setProducts(json.products));
    }
  }, [params.id]);

  if (!products) {
    return <Loading />;
  }

  return (
    <div className={productsStyle}>
      <ItemListContainer
        products={products}
        setCounter={props.setCounter}
        counter={props.counter}
      />
    </div>
  );
};

export default Products;
