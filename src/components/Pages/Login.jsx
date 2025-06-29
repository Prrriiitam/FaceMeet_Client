import GoogleLoginButton from "../GoogleLoginButton";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location  = useLocation();
  const socket   = useSocket();
  const { login: saveAuth, isAuth } = useAuth();
  /* Already logged in?  Skip this page entirely */
  if (isAuth) return <Navigate to="/match" replace />;
  
  const handleGoogleCred = async (googleToken) => {
    const res = await fetch("http://localhost:5000/api/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: googleToken }),
      credentials: "include", // if the server sets a cookie
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const { token, user } = await res.json();
    sessionStorage.setItem("authToken", token);
    //  authenticate this socket with the *new* token, then connect
    socket.auth = { token };
    socket.connect();
    saveAuth(token, user);
    // store token in context / localStorage; redirect, etc.
    alert(`Welcome ${user.name}! Login successful.`);
    console.log("Signed-in user:", user);
    const redirect = location.state?.from?.pathname || "/match";
    navigate(redirect, { replace: true });

    
  };

  return (
     <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#0B1120] to-black px-4">
      <div className="w-full max-w-md rounded-xl bg-[#1f2937]/80 p-8 text-white shadow-2xl backdrop-blur-md">
        <div className="space-y-6">
          <div>
            <h1 className="text-center text-3xl font-extrabold text-teal-400">
              Welcome to FaceMeet
            </h1>
            <p className="mt-2 text-center text-gray-300">
              Connect with people around the world. Fast, safe & one click away!
            </p>
          </div>

          {/* Centered Google Button */}
          <div className="flex justify-center">
            <GoogleLoginButton onLogin={handleGoogleCred} />
          </div>

          {/* Terms link */}
          <div className="text-center text-sm text-gray-400">
            <p>By signing in, you agree to our</p>
            <a href="/policy" className="text-teal-300 hover:underline">
              Terms & Privacy Policy
            </a>
          </div>

          {/* New: Why Sign in Section */}
          <div className="mt-4 rounded-lg bg-black/30 p-4 text-sm text-gray-300">
            <h2 className="mb-2 text-base font-semibold text-white">
              🔒 Why sign in with Google?
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-gray-400">
              <li>No need to remember passwords</li>
              <li>We never access your private data</li>
              <li>Helps us match you with verified users</li>
            </ul>
          </div>

          <hr className="border-gray-600" />

          <p className="text-center text-sm text-gray-500">
            Don't worry — we never post anything without your permission.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
