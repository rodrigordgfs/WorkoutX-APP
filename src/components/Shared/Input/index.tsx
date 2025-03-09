import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ title, error, ...rest }, ref) => {
    return (
      <label className="block w-full">
        <span className="text-zinc-700 dark:text-zinc-200">{title}</span>
        <input
          ref={ref}
          {...rest}
          className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        {error && (
          <span className="text-red-500 dark:text-red-400 text-sm mt-2">
            {error}
          </span>
        )}
      </label>
    );
  }
);

Input.displayName = "Input"; // Necessário para componentes com forwardRef
