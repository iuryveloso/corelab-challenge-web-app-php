import Image from "next/image";

interface CardButton {
  icon: string;
  className: string;
  type: 'edit' | 'color' | 'favorite' | 'delete' | 'save';
  onClickButton: (type: CardButton['type']) => void;
}

export default function CardButton({
  icon,
  className,
  type,
  onClickButton,
}: CardButton) {
  return (
    <button className={"cursor-pointer"} onClick={() => onClickButton(type)}>
      <Image
        src={icon}
        alt={"Main logo"}
        width={0}
        height={0}
        priority={true}
        className={className}
      />
    </button>
  );
}
