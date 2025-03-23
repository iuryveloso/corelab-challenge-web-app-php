'use client'
import { User } from '@/interfaces/userInterfaces'
import Image from 'next/image'
import { useState } from 'react'

interface NavProfile {
  user: User
  onClickLogout: () => void
}

export default function NavProfile({ user, onClickLogout }: NavProfile) {
  const domain = `${process.env.NEXT_PUBLIC_API_DOMAIN}/storage/uploads/`
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className={'flex flex-col items-center'}>
      <div className={'flex items-center'}>
        <label className={'mx-2'}>{user.name.split(' ')[0]}</label>
        <div
          className={'cursor-pointer'}
          onClick={() => setShowMenu(!showMenu)}
        >
          {user.avatar ? (
            <Image
              loader={({ src }) => src}
              unoptimized={true}
              src={`${domain}${user.avatar}`}
              width={70}
              height={70}
              alt={'Main logo'}
              priority={true}
              className={
                'h-10 w-10 rounded-full border border-gray-300 shadow-md'
              }
            />
          ) : (
            false
          )}
        </div>
      </div>
      {showMenu ? (
        <div className={'relative'}>
          <div
            className={`fixed inset-y-0 top-14 right-6 h-20 w-40 rounded-sm bg-white shadow-md`}
          >
            <div className={'flex h-full flex-col justify-center'}>
              <div className={`border-b border-gray-400 pb-1 text-center`}>
                <a href={'/profile'} className={''}>
                  Perfil de Usuário
                </a>
              </div>
              <div className={`pt-1 text-center`}>
                <button
                  onClick={() => {
                    setShowMenu(!showMenu)
                    onClickLogout()
                  }}
                  className={'cursor-pointer'}
                >
                  Sair do Sistema
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  )
}
