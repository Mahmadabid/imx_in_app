import React from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { ProductItem, State } from '../../global/Types';
import { Card, Divider, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { add } from '../../slice/BasketSlice';

export function Product() {
    const dispatch = useDispatch();
    const products = useSelector((state: State) => state.basket);
    const islit = useSelector((state: State) => state.themes.value);

    function amount(productAmount: number) {
        return productAmount + 1;
    }

    return (
        <div className="flex-grow mt-8">
            <Grid container spacing={3} className="flex flex-row justify-center">
                {products.map((product: ProductItem) => (
                    <Card
                        key={product.id}
                        className={`max-w-xs m-2 border border-white ${islit ? 'bg-white' : 'bg-gray-800'}`}
                        onClick={() => {
                            const updatedAmount = amount(product.amount);
                            dispatch(add([product, updatedAmount]));
                        }}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt={product.title}
                                height="200"
                                image={`${product.imageUrl}`}
                                title={product.title}
                            />
                            <CardContent>
                                <div className="flex flex-row justify-between">
                                    <h2 className="text-xl font-bold">
                                        {product.title}
                                    </h2>
                                    <h3 className="text-lg font-medium">
                                        £{(product.price / 100)}
                                    </h3>
                                </div>
                                <Divider />
                                <div className={`mt-2 ${islit ? 'text-gray-600' : 'text-gray-200'}`}>
                                    {product.description}
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Grid>
        </div>
    );
}
