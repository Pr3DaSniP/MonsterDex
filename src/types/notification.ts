export type Notification = {
  id: number
  type: 'success' | 'error' | 'warn'
  title: string
  message: string
}