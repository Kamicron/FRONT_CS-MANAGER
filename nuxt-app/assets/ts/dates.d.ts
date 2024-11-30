export {}

declare global {
  interface IloginDate {
    created_at: Date
    last_login: Date
    deleted_at?: Date
  }
}