import Image from 'next/image'

interface Button {
  icon?: string
  text: string
  color: string
  onClick: () => void
}

export default function Button({ icon, onClick, text, color }: Button) {
  return (
    <div className={'flex shadow-md'}>
      <button
        className={`w-full cursor-pointer rounded-sm px-3 py-1 shadow-md outline-none ${color} `}
        onClick={onClick}
      >
        {text}{' '}
        {icon ? (
          <Image
            src={icon}
            width={20}
            height={20}
            alt={'Icon'}
            priority={true}
          />
        ) : (
          false
        )}
      </button>
    </div>
  )
}
