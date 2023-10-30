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
import { HashContext, PassportContext, SignerContext, TxnHashContext, UserContext, UserInfoContext } from "@/utils/Context";
import { ethers } from 'ethers'
import { ContractAddress, ContractABI } from "../ContractDetails";

export const Basket = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: State) => state.basket);
    const islit = useSelector((state: State) => state.themes.value);
    const Hashes = useContext(HashContext);
    const TxnHash = useContext(TxnHashContext);
    const Signer = useContext(SignerContext);
    const items = products.filter((product: ProductItem) => product.added).length

    async function sendTransaction() {
        if (!Signer[0]) {
            console.error("Signer is not set!");
            return;
        }

        const contract = new ethers.Contract(ContractAddress, ContractABI.abi, Signer[0]);
        const txResponse = await contract.set('Your Purchase was Successful');
        TxnHash[1](txResponse.hash);
        console.log("Transaction hash:", txResponse.hash);
        return txResponse.hash;
    }

    const handleClick = () => {
        if (items === 0 || !Signer[0]) return;
        sendTransaction();
        dispatch(clearBasket());
        Hashes[1](true);
    }

    return (
        <>
            <div className="flex justify-between items-center mt-4 px-2">
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
            {!Signer[0] ? <div className="text-red-500 font-bold text-center">Loading! Please wait</div> : null}
            <div className="flex justify-center items-center my-4 disabled={items === 0}">
                <button onClick={handleClick} className={`px-6 py-2 rounded ${items === 0 ? 'bg-gray-400 cursor-not-allowed' : ' bg-emerald-600 text-white hover:bg-sky-500'}`}>{Signer[0] ?
                    <>Buy</> :
                    <svg className="animate-spin w-5 h-5 fill-white" viewBox="3 3 18 18">
                        <path className="opacity-20" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
                        </path>
                        <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z">
                        </path>
                    </svg>}</button>
            </div>
        </>
    );
};
