import type { ReactNode } from 'react'

type IconName = 'home' | 'stock' | 'partners' | 'settlements' | 'purchase' | 'shipping' | 'sale' | 'return'

type IconProps = {
  name: IconName
}

export function Icon({ name }: IconProps) {
  const paths: Record<IconName, ReactNode> = {
    home: (
      <>
        <path d="m3 10.5 9-7.5 9 7.5" />
        <path d="M5.5 9v11h13V9" />
        <path d="M9.5 20v-6h5v6" />
      </>
    ),
    stock: (
      <>
        <path d="m4 7 8-4 8 4-8 4-8-4Z" />
        <path d="M4 7v10l8 4 8-4V7" />
        <path d="M12 11v10" />
      </>
    ),
    partners: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19c.4-3.2 2.2-5 5.5-5s5.1 1.8 5.5 5" />
        <circle cx="17.5" cy="9" r="2.5" />
        <path d="M15.5 14.5c3.2-.6 5.1.9 5.5 3.8" />
      </>
    ),
    settlements: (
      <>
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
        <path d="M9 8h6M9 12h6" />
      </>
    ),
    purchase: (
      <>
        <path d="M6 8h12l1 13H5L6 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    shipping: (
      <>
        <path d="M3 7h11v10H3V7Z" />
        <path d="M14 10h4l3 3v4h-7v-7Z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
    sale: (
      <>
        <path d="M4 5h16v14H4V5Z" />
        <path d="m8 12 2.5 2.5L16 9" />
      </>
    ),
    return: (
      <>
        <path d="M8 7 3 12l5 5" />
        <path d="M4 12h9a7 7 0 0 1 7 7" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}
