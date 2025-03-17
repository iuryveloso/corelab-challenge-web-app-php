import Image from "next/image";
import { ChangeEvent } from "react";

interface Input {
  icon?: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ icon, onChange, value, placeholder }: Input) {
  const borderInput = icon
    ? `border-y-2 border-l-2 rounded-l-sm`
    : `border-2 rounded-sm`;
  return (
    <div className={"flex shadow-md "}>
      <input
        type={"text"}
        className={`
            px-3 py-1 outline-none 
            w-full
            ${borderInput} border-gray-300
        `}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {icon ? (
        <div
          className={`
            flex items-center
            px-3 py-1 border-y-2 border-r-2 
            rounded-r-sm border-gray-300 
            text-gray-400
        `}
        >
          <Image
            src={icon}
            width={20}
            height={20}
            alt={"Main logo"}
            priority={true}
          />
        </div>
      ) : (
        false
      )}
    </div>
  );
}
