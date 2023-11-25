import { useAuthentication } from "../utils/user/userAuthentication";

const Login = () => {

  const { logIn } = useAuthentication();
  
  return (
    <div className="flex flex-col items-center mt-52">
      <p className="text-center text-xl mb-4">Please login to Play.</p>
      <button onClick={logIn} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Login/Signup</button>
      <p className="text-center text-red-500 font-medium text-xl my-3">In case of ay error. PLease clear cache an reload.</p>
    </div>
  );
};

export default Login;
