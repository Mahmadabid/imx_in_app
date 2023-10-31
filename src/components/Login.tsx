import { useAuthentication } from "../utils/user/userAuthentication";

const Login = () => {

  const { logIn } = useAuthentication();
  
  return (
    <div className="flex flex-col items-center mt-52">
      <p className="text-center text-xl mb-4">Please login to Play.</p>
      <button onClick={logIn} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Login/Signup</button>
    </div>
  );
};

export default Login;
