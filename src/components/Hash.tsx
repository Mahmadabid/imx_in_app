import { InfoHashProps, State } from "@/global/Types";
import { HashContext } from "@/utils/Context";
import { styled, Button, ButtonProps, Card, CardContent } from "@mui/material";
import { purple } from "@mui/material/colors";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

const Hash: React.FC<InfoHashProps> = ({setshow}) => {

  const islit = useSelector((state: State) => {
    return state.themes.value
  });

  const Hashes = useContext(HashContext);

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: `${theme.palette.getContrastText(purple[500])} !important`,
    backgroundColor: `${purple[500]} !important`,
    '&:hover': {
      backgroundColor: `${purple[700]} !important`,
    },
  }));

  const handleStart = () => {
    Hashes[1](false);
    setshow(false);
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
                    <div className="flex flex-col font-bold items-center mb-2">
                        <p className="text-xl text-slate-600 mb-2">Purchase Was Successful</p>
                        <p className="border-b border-gray-300 pb-2 mr-2 flex-grow">
                            <span className="font-bold">Hash: </span>
                            {}
                        </p>
                    </div>
                    <div className="flex justify-center mt-4">
                        <ColorButton onClick={handleStart} variant="contained" size="large">Show User Information</ColorButton>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Hash