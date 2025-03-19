import Image from 'next/image'
import { ChangeEvent } from 'react'

interface Input {
  id?: string
  icon?: string
  value: string
  type?: string
  iconSize?: number
  placeholder: string
  onCLickIcon?: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  id,
  icon,
  onChange,
  value,
  type,
  iconSize,
  onCLickIcon,
  placeholder,
}: Input) {
  const borderInput = icon
    ? `border-y-2 border-l-2 rounded-l-sm`
    : `border-2 rounded-sm`
  return (
    <div className={'flex shadow-md'}>
      <input
        type={type ?? 'text'}
        id={id as string}
        className={`w-full px-3 py-1 outline-none ${borderInput} border-gray-300`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {icon ? (
        <div
          className={`flex items-center rounded-r-sm border-y-2 border-r-2 border-gray-300 px-3 py-1 text-gray-400`}
        >
          {onCLickIcon ? (
            <Image
              src={icon}
              width={iconSize}
              height={iconSize}
              alt={'Input Icon'}
              priority={true}
              onClick={onCLickIcon}
              className={'cursor-pointer'}
            />
          ) : (
            <Image
              src={icon}
              width={iconSize}
              height={iconSize}
              alt={'Input Icon'}
              priority={true}
            />
          )}
        </div>
      ) : (
        false
      )}
    </div>
  )
}
