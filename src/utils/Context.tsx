import { ProductItem, UserObject } from '../global/Types';
import { passport } from '@imtbl/sdk';
import { Dispatch, SetStateAction, createContext } from 'react'
import { ethers } from 'ethers';

export const initialState: ProductItem[] = [
    {
        id: '123',
        title: 'Blue t-shirt',
        description: 'No fancy sizing charts here, one t-shirt size to rule them all',
        imageUrl: '/blue-tshirt.png',
        price: 399,
        amount: 0
    },
    {
        id: '456',
        title: 'Yellow t-shirt',
        description:
            'This unique t-shirt is guaranteed to fit nobody, not even new born babies',
        imageUrl: '/yellow-tshirt.png',
        price: 499,
        amount: 0
    },
    {
        id: '789',
        title: 'Red t-shirt',
        description: 'The only product on our site that might actually be worth buying',
        imageUrl: '/red-tshirt.png',
        price: 799,
        amount: 0
    }
];

export const UserContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>(([false, () => { }]));

export const HashContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>(([false, () => { }]));

export const UserDataContext = createContext<[string, Dispatch<SetStateAction<string>>]>((['', () => { }]));

export const TxnHashContext = createContext<[string, Dispatch<SetStateAction<string>>]>((['', () => { }]));

export const PassportContext = createContext<[passport.Passport | null, Dispatch<SetStateAction<passport.Passport | null>>]>([null, () => { }])

export const SignerContext = createContext<[ethers.Signer | null, Dispatch<SetStateAction<ethers.Signer | null>>]>([null, () => { }])

export const UserInfoContext = createContext<[UserObject | null, Dispatch<SetStateAction<UserObject | null>>]>([null, () => { }]);
