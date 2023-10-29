import { useContext } from "react";
import { PassportContext } from "../Context";

export const useAuthentication = () => {
    const passportProvider = useContext(PassportContext);
    const passport = passportProvider[0];

    const logIn = async () => {
        if (!passport) return;

        try {
            const provider = passport.connectEvm();
            await provider.request({ method: "eth_requestAccounts" });

        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const logOut = async () => {
        await passport?.logout();
    };

    const handleLoginCallback = () => {
        if (passport) {
            passport.loginCallback();
        } else {
            console.error("Passport instance is not available.");
        }
    }

    return { logIn, logOut, handleLoginCallback };
};