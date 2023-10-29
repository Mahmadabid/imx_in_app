import { State, InfoHashProps } from "@/global/Types";
import { PassportContext, UserInfoContext } from "@/utils/Context";
import { ArrowDropDownCircle } from "@mui/icons-material";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { styled, Button, ButtonProps, Card, CardContent } from "@mui/material";
import { purple } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Info: React.FC<InfoHashProps> = ({ setshow, User }) => {

    const [UserData, setUserData] = useState<string | undefined>('');
    const UserInfo = useContext(UserInfoContext);
    const [isIDTokenExpanded, setIDTokenExpanded] = useState(false);
    const [isAccessTokenExpanded, setAccessTokenExpanded] = useState(false);
    const islit = useSelector((state: State) => {
        return state.themes.value
    });

    const passportProvider = useContext(PassportContext);

    useEffect(() => {
        const passport = passportProvider[0];

        async function fetch() {
            const data = await passport?.getUserInfo();
            setUserData(data?.nickname)
        }

        fetch()

    }, [User])

    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: `${theme.palette.getContrastText(purple[500])} !important`,
        backgroundColor: `${purple[500]} !important`,
        '&:hover': {
            backgroundColor: `${purple[700]} !important`,
        },
    }));

    const handleStart = () => {
        setshow(true);
    }

    return (
        <div className='flex flex-col break-all items-center justify-center mt-8'>
            <Card
                style={{
                    opacity: 0.7,
                    backgroundColor: islit ? 'rgb(207, 217, 222)' : 'white',
                    padding: '20px',
                    maxWidth: '80%',
                }}
            >
                <CardContent>
                    <div className="flex items-center mb-2">
                        <p className="border-b border-gray-300 pb-2 mr-2 flex-grow">
                            <span className="font-bold">ID Token: </span>
                            {isIDTokenExpanded ? UserInfo[0]?.id_token : `${(UserInfo[0]?.id_token || '').slice(0, 30)}...`}
                        </p>
                        {isIDTokenExpanded ?
                            <ArrowCircleUpIcon onClick={() => setIDTokenExpanded(false)} /> :
                            <ArrowDropDownCircle onClick={() => setIDTokenExpanded(true)} />
                        }
                    </div>
                    <div className="flex items-center mb-2">
                        <p className="border-b border-gray-300 pb-2 mr-2 flex-grow">
                            <span className="font-bold">Access Token: </span>
                            {isAccessTokenExpanded ? UserInfo[0]?.access_token : `${(UserInfo[0]?.access_token || '').slice(0, 30)}...`}
                        </p>
                        {isAccessTokenExpanded ?
                            <ArrowCircleUpIcon onClick={() => setAccessTokenExpanded(false)} /> :
                            <ArrowDropDownCircle onClick={() => setAccessTokenExpanded(true)} />
                        }
                    </div>
                    <p className="border-b border-gray-300 pb-2 mr-2 flex-grow">
                        <span className="font-bold">User NickName: </span>
                        {UserData || UserInfo[0]?.profile?.email}
                    </p>
                    <div className="flex justify-center mt-4">
                        <ColorButton onClick={handleStart} variant="contained" size="large">Show Basket</ColorButton>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Info