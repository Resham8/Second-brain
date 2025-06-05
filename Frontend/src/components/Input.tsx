import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface inputProps {
  register: UseFormRegister<any>;
  name: string;
  placeholder: string;
  validations?:RegisterOptions;
  error?: string;
}

export default function Input({ register, placeholder, name, validations, error }: inputProps) {
  return (
    <div>
      <input
        {...register(name,validations)}
        id={name}
        type={"text"}
        placeholder={placeholder}
        className="px-4 py-2 border-gray-500 border rounded m-2"
      />
      {error && <p className="text-red-500 text-sm mt-1 m-1">{error}</p>}
    </div>
  );
}
