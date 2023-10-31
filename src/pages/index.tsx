import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import ShoppingBasket from '../components/basket/ShoppingBasket';
import { HashContext, UserContext } from '@/utils/Context';
import Login from '@/components/Login';
import { State } from '@/global/Types';
import Info from '@/components/Info';
import Hash from '@/components/Hash';

function Home() {

  const User = useContext(UserContext);
  const Hashes = useContext(HashContext);
  const [show, setshow] = useState(false);
  const islit = useSelector((state: State) => {
    return state.themes.value
  });

  return (
    <div className={`${islit ? '' : 'dark'}`} >
      {User[0] ? show ? Hashes[0] ?
        <Hash setshow={setshow} /> :
        <ShoppingBasket /> :
        <Info setshow={setshow} /> :
        <div className='flex flex-col items-center justify-center flex-grow mt-8'>
          <Login />
        </div>
      }
    </div>
  );
}
export default Home