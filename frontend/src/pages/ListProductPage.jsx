import React from "react";
import BodyListProducts from "../components/BodyListProducts";
import HeaderListProducts from "../components/HeaderListProducts";
import FooterListProduct from "../components/FooterListProduct";

function ListProductPage() {
  return (
    <div>
      <HeaderListProducts />
      <BodyListProducts />
      <FooterListProduct />
    </div>
  );
}

export default ListProductPage;
