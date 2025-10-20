import React from "react";
import MainTemplate from "../plantillas/MainTemplate";
import CheckoutOrganismo from "../organismos/CheckoutOrganismo";
import "../../estilos/checkoutPage.css";

const CheckoutPage = () => {
  return (
    <MainTemplate>
      <CheckoutOrganismo />
    </MainTemplate>
  );
};

export default CheckoutPage;
