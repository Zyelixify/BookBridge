export interface MenuItemConfig {
  label: string
  icon?: string
  isRouterLink: boolean
}

type MenuItem = Record<string, MenuItemConfig>

export default () => {
  const sidebarConfig = computed((): MenuItem => ({
    '/': {
      label: `Dashboard`,
      icon: 'material-symbols:dashboard-outline',
      isRouterLink: true,
    },
    '/books': {
      label: `Books`,
      icon: 'material-symbols:book-2-outline-rounded',
      isRouterLink: true,
    },
  }))

  const footerConfig = computed((): MenuItem => ({
    '/auth/logout': {
      label: 'Logout',
      icon: 'material-symbols:logout-rounded',
      isRouterLink: true,
    },
    '/about': {
      label: `About`,
      icon: 'material-symbols:info-outline',
      isRouterLink: true,
    },
  }))

  return { sidebarConfig, footerConfig }
}
