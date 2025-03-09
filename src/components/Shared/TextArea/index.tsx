interface TextAreaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  placeholder?: string;
}

export const TextArea = ({
  name,
  onChange,
  value,
  placeholder,
  rows = 3,
  disabled,
  required,
}: TextAreaProps) => {
  return (
    <label className="block">
      <span className="text-zinc-700 dark:text-zinc-200">{name}</span>
      <textarea
        value={value}
        onChange={onChange}
        className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        rows={rows}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </label>
  );
};
