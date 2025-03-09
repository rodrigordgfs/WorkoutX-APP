import { ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ImageSelectorProps {
  name: string;
  image?: string | null;
  accept?: string;
  onImageChange: (image: string) => void;
}

export const ImageSelector = ({
  name,
  onImageChange,
  image,
  accept = "image/png, image/jpeg, image/webp",
}: ImageSelectorProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      setImagePreview(null);
    }
  }, [image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(URL.createObjectURL(file));
      onImageChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col">
      <span className="text-zinc-700 dark:text-zinc-200 mb-2">{name}</span>
      <label className="relative cursor-pointer">
        <input
          type="file"
          accept={accept}
          onChange={handleImageChange}
          className="hidden"
        />
        <div className="w-full md:w-48 h-48 bg-zinc-200 dark:bg-zinc-700 rounded-lg flex items-center justify-center overflow-hidden shadow-md">
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
    </div>
  );
};
