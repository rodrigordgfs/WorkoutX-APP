interface InputProps {
  name: string;
  value: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  name,
  onChange,
  value,
  placeholder,
  required = false,
  disabled = false,
  type = "text",
}: InputProps) => {
  return (
    <label className="block w-full">
      <span className="text-zinc-700 dark:text-zinc-200">{name}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        required={required}
        disabled={disabled}
      />
    </label>
  );
};
