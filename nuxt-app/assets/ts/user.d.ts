export {}

declare global {
  interface IUser {
    _id: string
    username: string
    password: string
    level: number
    isAdmin: Boolean
    created_at: Date
    last_login: Date
    deleted_at?: Date
  }
}