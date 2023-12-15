/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import { useEffect, useState } from "react";
import { productsStyle } from "./products.module.css";
import Loading from "../components/Loading/Loading";
import { getProducts } from "../firebase/firebase";

const Products = (props) => {
  const [products, setProducts] = useState(null);
  const params = useParams();

  useEffect(() => {
    awaitProducts();
  }, [params.id]);

  const awaitProducts = async () => {
    let p;
    if (params?.id) {
      p = await getProducts(params.id);
    } else {
      p = await getProducts();
    }
    setProducts(p);
  };

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
