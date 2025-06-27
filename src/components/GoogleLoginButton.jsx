import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton({ onLogin }) {
  return (
    <GoogleLogin
      onSuccess={({ credential }) => onLogin(credential)}
      onError={() => console.log("Google login failed")}
      width="280"
      text="signin_with"
      shape="pill"
    />
  );
}
