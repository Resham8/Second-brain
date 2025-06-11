import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useMutation } from "@tanstack/react-query";
import { authUser } from "../api/api";
import { useForm } from "react-hook-form";
import { useAuth } from "../state/useAuthStore";
import { useToastState } from "../state/useToastStore";

export default function Auth({ isSignup }: { isSignup: boolean }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  type FormData = {
    username: string;
    password: string;
  };

  const showToast = useToastState((state) => state.showToast);

  // console.log(username, password);
  const { mutate } = useMutation({
    mutationFn: async ({ username, password }: FormData) => {
      if (!username || !password) {
        alert("Username and password are required!");
        return;
      }

      const token = await authUser({ username, password, isSignup });
      return token;
    },
    onSuccess: (token) => {
      if (isSignup) {
        // alert("You have signed up!");
        showToast({message:"You have signed up!", type:"success"})
        navigate("/signin");
      } else {
        login(token);
        showToast({message:"You have signed in!", type:"success"})
        // alert("You have signed in!");
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      console.error("Auth failed:", error);      
      showToast({message:"Something went wrong.", type:"error"})
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-500 text-sm">
              {isSignup ? "Join us to get started" : "Sign in to your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              register={register}
              name="username"
              placeholder="Username"
              validations={{
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 8 characters",
                },
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

            <div className="pt-2">
              <Button
                variant="primary"
                text={`${isSignup ? "Sign Up" : "Sign In"}`}
                fullWidth={true}
                loading={false}
                type="submit"
              />
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button 
                onClick={() => navigate(isSignup ? "/signin" : "/signup")}
                className="text-[#5046e4] hover:text-[#4940be] font-medium transition-colors"
              >
                {isSignup ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}