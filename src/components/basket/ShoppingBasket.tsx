import React from "react"
import { Container } from "@mui/material"
import { Basket } from "./Basket"
import { Product } from "./Product"

const ShoppingBasket = () => {

    return (
        <Container>
            <Product />
            <Basket />
        </Container>
    )
}

export default ShoppingBasket