import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

interface TitleProps {
  icon: LucideIcon;
  title: string;
  goTo?: string;
  iconGoTo?: LucideIcon;
  textGoTo?: string;
}

export const SectionTitle = ({
  icon: Icon,
  iconGoTo: IconGoTo,
  title,
  textGoTo,
  goTo,
}: TitleProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200 rounded-lg">
          <Icon size={24} />
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {goTo && (
        <Button
          text={textGoTo ?? ""}
          icon={IconGoTo}
          onClick={() => {
            navigate(goTo);
          }}
          variant="primary"
        />
      )}
    </div>
  );
};
