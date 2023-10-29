import React, { useContext } from "react";
import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    IconButton,
    Avatar,
    Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { ProductItem, State } from "../../global/Types";
import { clearBasket, remove } from "../../slice/BasketSlice";
import { HashContext } from "@/utils/Context";

export const Basket = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: State) => state.basket);
    const islit = useSelector((state: State) => state.themes.value);
    const Hashes = useContext(HashContext);

    const items = products.filter((product: ProductItem) => product.added).length

    const handleClick = () => {
        if (items === 0) return;
        Hashes[1](true);
        dispatch(clearBasket());
    }

    return (
        <>
            <div className="flex justify-between items-center px-2">
                <div>
                    <h2 className="text-primary mt-5 text-lg font-semibold">Shopping Basket</h2>
                    <div className="text-base">
                        You have {items} items in your basket
                    </div>
                </div>
                <div className="font-bold text-xl">
                    &pound;{(
                        products
                            .filter((product: ProductItem) => product.added)
                            .reduce((acc: number, current: { price: number; amount: number; }) => (acc += (current.price * current.amount)), 0) / 100
                    ).toFixed(2)}
                </div>
            </div>
            <List className="w-full">
                {products
                    .filter((product: ProductItem) => product.added)
                    .map((product: ProductItem) => (
                        <div key={product.id} className={`w-full ${islit ? 'bg-white' : 'bg-gray-800'} py-2 mb-2`}>
                            <ListItem className="flex items-start">
                                <ListItemAvatar>
                                    <Avatar alt="Product" src={`${product.imageUrl}`} />
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <>
                                        {product.title}
                                        <Button variant="contained" disabled className="amount">
                                            {product.amount}
                                        </Button>
                                    </>
                                }
                                    secondary={
                                        <>
                                            <span className="text-base inline-block">&pound;{((product.price / 100) * product.amount).toFixed(2)}</span>
                                            <span className={`ml-1 ${islit ? 'text-gray-600' : 'text-gray-200'}`}>
                                                &nbsp; ― {product.description}
                                            </span>
                                        </>
                                    } />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => dispatch(remove({ id: product.id }))}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </div>
                    ))}
            </List>
            <div className="flex justify-center items-center my-4 disabled={items === 0}">
                <button onClick={handleClick} className={`px-6 py-2 rounded ${items === 0 ? 'bg-gray-400 cursor-not-allowed' : ' bg-emerald-600 text-white hover:bg-sky-500'}`}>Buy</button>
            </div>
        </>
    );
};
