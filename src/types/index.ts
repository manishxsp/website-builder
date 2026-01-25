export interface User {
  id: string
  email: string
  name?: string
}

export interface Site {
  id: string
  userId: string
  domain: string
  template: string
  content?: any
  published: boolean
}
