interface SelectProps {
  name: string;
  value: string | "";
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { id: string; name: string }[];
  required?: boolean;
  disabled?: boolean;
}

export const Select = ({
  name,
  onChange,
  options,
  disabled,
  required,
  value,
}: SelectProps) => {
  return (
    <label className="block">
      <span className="text-zinc-700 dark:text-zinc-200">{name}</span>
      <select
        value={value}
        onChange={onChange}
        className="mt-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        required={required}
        disabled={disabled}
      >
        <option value="">Selecione...</option>
        {options?.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
    </label>
  );
};
