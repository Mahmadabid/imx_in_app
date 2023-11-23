import { InfoHashProps, State } from "@/global/Types";
import { ErrorContext, HashContext, TxnHashContext } from "@/utils/Context";
import { styled, Button, ButtonProps, Card, CardContent } from "@mui/material";
import { purple } from "@mui/material/colors";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

const Hash: React.FC<InfoHashProps> = ({ setshow }) => {

  const islit = useSelector((state: State) => {
    return state.themes.value
  });
  const Txn = useContext(TxnHashContext);
  const Hashes = useContext(HashContext);
  const TxnError = useContext(ErrorContext);

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: `${theme.palette.getContrastText(purple[500])} !important`,
    backgroundColor: `${purple[500]} !important`,
    '&:hover': {
      backgroundColor: `${purple[700]} !important`,
    },
  }));

  const handleStart = async () => {
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
          {Txn[0].length === 0 ? TxnError[0] ?
            <div className="flex flex-col font-bold items-center justify-center">
              <p className="text-xl text-red-600">{TxnError[0]? 'Transaction Error': TxnError[0]}</p>
              <p className="mt-4 text-sky-800 text-xl">Please Try Again</p>
            </div> :
            <div className="flex flex-col font-bold items-center mb-2">
              <h3 className="text-xl text-slate-600 mb-2">Waiting for Transaction</h3>
              <svg className="animate-spin w-7 h-7 mt-6 fill-slate-800" viewBox="3 3 18 18">
                <path className="opacity-20" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
                </path>
                <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z">
                </path>
              </svg>
            </div> :
            <>
              <div className="flex flex-col font-bold items-center mb-2">
                <p className="text-xl text-slate-600 mb-2">Purchase Was Successful</p>
                <p className="border-b border-gray-300 pb-2 mr-2 flex-grow">
                  <span className="font-bold flex flex-row items-center">Hash:&nbsp;
                    {Txn[0]}
                  </span>
                </p>
              </div>
              <div className="flex justify-center mt-2">
                <ColorButton onClick={handleStart} variant="contained" size="large">Show User Information</ColorButton>
              </div>
            </>}
        </CardContent>
      </Card>
    </div >
  )
}

export default Hash