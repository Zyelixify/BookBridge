export interface MenuItemConfig {
  label: string
  icon?: string
  isRouterLink: boolean
}

type MenuItem = Record<string, MenuItemConfig>

export default () => {
  const sidebarConfig = computed((): MenuItem => ({
    '/': {
      label: `Home`,
      icon: 'uil:home',
      isRouterLink: true,
    },
    '/about': {
      label: `About`,
      icon: 'uil:question-circle',
      isRouterLink: true,
    },
    '/books': {
      label: `Books`,
      icon: 'uil:book-open',
      isRouterLink: true,
    },
  }))

  const footerConfig = computed((): MenuItem => ({
    '/auth/logout': {
      label: 'Logout',
      icon: 'uil:sign-out-alt',
      isRouterLink: true,
    },
  }))

  return { sidebarConfig, footerConfig }
}
