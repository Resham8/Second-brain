import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useMutation } from "@tanstack/react-query";
import { authUser } from "../api/api";
import { useForm } from "react-hook-form";

export default function Auth({ isSignup }: { isSignup: boolean }) {
  const navigate = useNavigate();

  const { register, handleSubmit,reset,formState: {errors} } = useForm<FormData>();

  type FormData = {
    username: string;
    password: string;
  };
  // console.log(username, password);
  const { mutate } = useMutation({
    mutationFn: async ({ username, password }: FormData) => {
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

  const onSubmit = (data: FormData) => {
    mutate(data);
    reset();
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-xl border-gray-600 border min-w-48 p-8">
          <Input
            register={register}
            name="username"
            placeholder="Username"
            validations={{ required: "Username is required",
                minLength: {
                    value: 3,
                    message: "Username must be at least 8 characters"
                }
             }}
            error={errors.username?.message}
          />
          <Input
            register={register}
            name="password"
            placeholder="Password"
            validations={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            error={errors.password?.message}
          />

          <div className="flex justify-center pt-4">
            <Button
              variant="primary"
              text={`${isSignup ? "Sign Up" : "Sign In"}`}
              fullWidth={true}
              loading={false}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
