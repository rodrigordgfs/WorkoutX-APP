import { ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ImageSelectorProps {
  title: string;
  image?: string | null;
  accept?: string;
  error?: string;
  onChange: (image: string | null) => void;
}

export const ImageSelector = ({
  title,
  onChange,
  image,
  accept = "image/png, image/jpeg, image/webp",
  error,
}: ImageSelectorProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    image || null
  );

  useEffect(() => {
    setImagePreview(image || null);
  }, [image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(URL.createObjectURL(file));
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col">
      <span className="text-zinc-700 dark:text-zinc-200 mb-2">{title}</span>
      <label className="relative cursor-pointer">
        <input
          type="file"
          accept={accept}
          onChange={handleImageChange}
          className="hidden"
        />
        <div
          className={`w-full md:w-48 h-48 bg-zinc-200 dark:bg-zinc-700 rounded-lg flex items-center justify-center overflow-hidden shadow-md border border-dashed ${
            error ? "border-red-500 ring ring-red-500" : "border-zinc-400 dark:border-zinc-600"
          }`}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Pré-visualização"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon size={48} className="text-zinc-500 dark:text-zinc-300" />
          )}
        </div>
      </label>
      {error && (
        <span className="text-red-500 dark:text-red-400 text-sm mt-1">
          {error}
        </span>
      )}
    </div>
  );
};
