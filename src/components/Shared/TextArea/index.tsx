import { forwardRef } from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ title, error, ...rest }, ref) => {
    return (
      <label className="block w-full">
        <span className="text-zinc-700 dark:text-zinc-200">{title}</span>
        <textarea
          ref={ref}
          {...rest}
          className={`mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border border-zinc-300 dark:border-zinc-700 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${error ? 'border-red-500 ring ring-red-500' : ''}`}
        />
        {error && (
          <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">
            {error}
          </span>
        )}
      </label>
    );
  }
);

TextArea.displayName = "TextArea";
