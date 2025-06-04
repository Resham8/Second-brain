import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { authUser } from "../api/api";

export default function Auth({ isSignup }: { isSignup: boolean }) {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  const username = usernameRef.current?.value;
  const password = passwordRef.current?.value;
  console.log(username, password);
  const { mutate } = useMutation({
    mutationFn: async () => {
      const username = usernameRef.current?.value || "";
      const password = passwordRef.current?.value || "";

      if (!username || !password) {
        alert("Username and password are required!");
        return;
      }

      await authUser({ username, password, isSignup });
    },
    onSuccess: () => {
      if (isSignup) {
        alert("You have signed up!");
        navigate("/signin");
      } else {
        alert("You have signed in!");
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      console.error("Auth failed:", error);
      alert("Something went wrong.");
    },
  });

  // async function authentication() {
  //   const username = usernameRef.current.value;
  //   const password = passwordRef.current.value;
  //   const url = isSignup
  //     ? `${BACKEND_URL}/api/v1/signup`
  //     : `${BACKEND_URL}/api/v1/signin`;
  //   const response = await axios.post(url, {
  //     username,
  //     password,
  //   });

  //   if (!isSignup) {
  //     const token = response.data.token;
  //     localStorage.setItem("token", token);
  //     navigate("/dashboard");
  //   }

  //   navigate("/signin");
  //   alert("You have signed up!");
  // }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border-gray-600 border min-w-48 p-8">
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password" />

        <div className="flex justify-center pt-4">
          <Button
            variant="primary"
            text={`${isSignup ? "Sign Up" : "Sign In"}`}
            fullWidth={true}
            loading={false}
            onClick={mutate}
          />
        </div>
      </div>
    </div>
  );
}
