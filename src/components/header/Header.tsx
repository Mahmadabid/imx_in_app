import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../slice/ThemeSlice';
import { State } from '../../global/Types';
import { PassportContext, UserContext, UserInfoContext } from '@/utils/Context';
import { useAuthentication } from '@/utils/user/userAuthentication';

export const Header = () => {
    const dispatch = useDispatch();
    const islit = useSelector((state: State) => state.themes.value);
    const [log, setlog] = useState(false);
    const { logIn, logOut } = useAuthentication();
    const [User, setUser] = useContext(UserContext);
    const [_, setUserInfo] = useContext(UserInfoContext);
    const Passport = useContext(PassportContext);
    const passport = Passport[0];
    const [userData, setUserData] = useState({
        email: '',
        sub: '',
        nickname: '',
        idToken: '',
        accessToken: ''
    });

    useEffect(() => {
        function handleAuthSuccess(event: MessageEvent) {
            if (event.data.type === 'authSuccess') {
                const intervalId = setInterval(() => {
                    const key = `oidc.user:https://auth.immutable.com:${process.env.NEXT_PUBLIC_CLIENT_ID}`;
                    const userData = localStorage.getItem(key);
                    if (userData && userData.length > 0) {
                        try {
                            const parsedData = JSON.parse(userData);
                            setUser(true);
                            setUserData({
                                email: parsedData.profile?.email,
                                sub: parsedData.profile?.sub,
                                nickname: '',
                                idToken: parsedData?.id_token,
                                accessToken: parsedData?.access_token,
                            });
                            setlog(true);
                            clearInterval(intervalId);
                        } catch (error) {
                            console.error("Error parsing user data from localStorage:", error);
                        }
                    }
                }, 700);
            }
        }

        window.addEventListener('message', handleAuthSuccess);

        return () => {
            window.removeEventListener('message', handleAuthSuccess);
        };
    }, []);

    useEffect(() => {
        let nickname = '';
        async function userNickname() {
            const data = await passport?.getUserInfo();
            nickname = data?.nickname || '';
        }
        if (passport && log) {
            userNickname();
            setUserInfo({
                email: userData.email,
                sub: userData.sub,
                nickname: nickname,
                idToken: userData.idToken,
                accessToken: userData.accessToken
            })
        }
    }, [passport, log, userData])

    return (
        <div style={{ flexGrow: 1, width: '100vw' }}>
            <AppBar position="static" style={{ backgroundColor: islit ? undefined : 'rgb(20, 117, 121)' }}>
                <Toolbar>
                    {User ? (
                        <button onClick={logOut} style={{ marginRight: '10px', fontSize: '18px', color: 'white', fontWeight: 'bold' }}>Logout</button>
                    ) : (
                        <button onClick={logIn} style={{ marginRight: '10px', fontSize: '18px', color: 'white', fontWeight: 'bold' }}>Login</button>
                    )}
                    <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
                        Shopping Basket
                    </Typography>
                    <IconButton
                        onClick={() => {
                            dispatch(setTheme());
                        }}
                        color="inherit"
                    >
                        {islit ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
