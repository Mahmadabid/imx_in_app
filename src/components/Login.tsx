import { useAuthentication } from '../utils/user/userAuthentication';
import { useContext, useEffect } from 'react';
import { UserContext, UserInfoContext } from '../utils/Context';
import { UserObject } from '@/global/Types';

const Login = () => {
  const { logIn } = useAuthentication();
  const [_, setUser] = useContext(UserContext);
  const [__, setUserInfo] = useContext(UserInfoContext);

  useEffect(() => {
    function handleAuthSuccess(event: MessageEvent) {
      if (event.data.type === 'authSuccess') {
        let attempts = 0;
        const maxAttempts = 6;

        const intervalId = setInterval(() => {
          const key = `oidc.user:https://auth.immutable.com:${process.env.NEXT_PUBLIC_CLIENT_ID}`;
          const userData = localStorage.getItem(key);
          if (userData && userData.length > 0) {
            try {
              const parsedData: UserObject = JSON.parse(userData);
              setUser(true);
              setUserInfo(parsedData);
              clearInterval(intervalId);
            } catch (error) {
              console.error("Error parsing user data from localStorage:", error);
            }
          } else if (attempts >= maxAttempts) {
            clearInterval(intervalId);
          }
          attempts++;
        }, 700);
      }
    }

    window.addEventListener('message', handleAuthSuccess);

    return () => {
      window.removeEventListener('message', handleAuthSuccess);
    };
  }, []);

  return (
    <div className="flex flex-col items-center mt-52">
      <p className="text-center text-xl mb-4">Please login to Play.</p>
      <button onClick={logIn} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Login/Signup</button>
    </div>
  );
};

export default Login;
