import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export default function Auth({ isSignup }: { isSignup: boolean }) {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function authentication() {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const url = isSignup
      ? `${BACKEND_URL}/api/v1/signup`
      : `${BACKEND_URL}/api/v1/signin`;
    const response = await axios.post(url, {
      username,
      password,
    });

    if (!isSignup) {
      const token = response.data.token;      
      localStorage.setItem("token", token);      
      navigate("/dashboard");
    }

    navigate("/signin");
    alert("You have signed up!");
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border-gray-600 border min-w-48 p-8">
        <Input placeholder="Username" />
        <Input placeholder="Password" />

        <div className="flex justify-center pt-4">
          <Button
            variant="primary"
            text={`${isSignup ? "Sign Up" : "Sign In"}`}
            fullWidth={true}
            loading={false}
            onClick={authentication}
          />
        </div>
      </div>
    </div>
  );
}
