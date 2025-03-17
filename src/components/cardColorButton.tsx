import { Todo } from "@/interfaces/todoInterfaces";

interface CardColorButton {
  color: Todo["color"];
  editColor: (color: Todo["color"]) => void;
}

export default function CardColorButton({ color, editColor }: CardColorButton) {
    const colorClassName = `bg-card-${color}`;
  return (
    <button
      className={`w-8 h-8 ${colorClassName} rounded-full cursor-pointer`}
      onClick={() => editColor(color)}
    />
  );
}
