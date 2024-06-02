import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'

export default () => {
  const sidebarConfig = useSidebarConfig()

  const makeSidebarOption = (path: string, config: MenuItemConfig): MenuOption => {
    const icon = () => {
      if (typeof config.icon === 'string') {
        return useIcon(config.icon)
      }
      return config.icon ? h(config.icon) : undefined
    }
    return {
      label: () => h(RouterLink, { to: path }, { default: () => config.label }),
      labelText: path,
      key: path,
      icon,
    }
  }
  const sidebarOptions = computed((): MenuOption[] => Object.entries(sidebarConfig.value)
    .map(([path, config]) => {
      const sidebarOption = makeSidebarOption(path, config)
      const options = []
      options.push(sidebarOption)
      return options
    })
    .flat(),
  )

  return sidebarOptions
}
