import React, { useContext, useEffect } from "react";
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
import { HashContext, LoadContext, PassportContext, SignerContext, TxnHashContext, UserContext, UserInfoContext } from "@/utils/Context";
import { ethers } from 'ethers'
import { ContractAddress, ContractABI } from "../ContractDetails";

export const Basket = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: State) => state.basket);
    const islit = useSelector((state: State) => state.themes.value);
    const Hashes = useContext(HashContext);
    const User = useContext(UserContext);
    const TxnHash = useContext(TxnHashContext);
    const Signer = useContext(SignerContext);
    const passportProvider = useContext(PassportContext);
    const passport = passportProvider[0];
    const items = products.filter((product: ProductItem) => product.added).length

    useEffect(() => {
        async function getWallet() {
            if (!passport) return;
            const Provider = passport.connectEvm();
            const provider = new ethers.providers.Web3Provider(Provider);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            Signer[1](signer);
        }

        getWallet();
    }, [User[0]]);

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
        if (items === 0) return;
        sendTransaction();
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
