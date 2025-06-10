import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  register: UseFormRegister<any>;
  name: string;
  placeholder: string;
  type?: string;
  validations?: RegisterOptions;
  error?: string;
}

export default function Input({ 
  register, 
  placeholder, 
  name, 
  type = "text",
  validations, 
  error
}: InputProps) {
  return (
    <div className="w-full p-2">
      <input
        {...register(name, validations)}
        id={name}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-blue-500 outline-none transition-colors ${
          error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
        }`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}