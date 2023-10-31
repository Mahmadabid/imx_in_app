import { StaticImageData } from "next/dist/shared/lib/get-img-props";
import { AppBarProps } from '@mui/material/AppBar';
import { ListItemProps } from '@mui/material/ListItem';
import { CardProps } from '@mui/material/Card';

export interface ThemeState {
    value: boolean;
}

export interface State {
    themes: ThemeState
    basket: ProductItem[]
}

export type CustomAppBarProps = AppBarProps & {
    islit: boolean;
};

export type CustomAppBarPropsInner = {
    islit?: boolean;
};


export type InfoHashProps = {
    setshow: (value: React.SetStateAction<boolean>) => void;
}

export type CustomListItemProps = ListItemProps & {
    islit: boolean;
};

export type CustomCardProps = CardProps & {
    islit: boolean;
};

export interface ProductItem {
    id: string
    title: string
    description: string
    price: number
    imageUrl: string | StaticImageData
    amount: number
    added?: boolean
}
interface Passport {
    zkevm_eth_address?: string;
    zkevm_user_admin_address?: string;
}

interface Profile {
    passport?: Passport;
    email?: string;
    email_verified?: boolean;
    iss?: string;
    aud?: string;
    iat?: number;
    exp?: number;
    sub?: string;
    sid?: string;
}

export interface UserLocalObject {
    id_token?: string;
    session_state?: null;
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    scope?: string;
    profile?: Profile;
    expires_at?: number;
}

export interface UserObject {
    email?: string;
    sub?: string;
    nickname?: string;
    idToken?: string | undefined;
    accessToken?: string | undefined;
}