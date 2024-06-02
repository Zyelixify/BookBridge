export default (currentRoute: ComputedRef<string>) => {
  const appName = 'LMS'
  return { appName, currentRoute }
}
