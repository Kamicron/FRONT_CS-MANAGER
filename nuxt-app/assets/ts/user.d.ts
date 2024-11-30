export {}

declare global {
  interface IUser {
    _id: string
    username: string
    password: string
    level: number
    isAdmin: Boolean
    dates: IloginDate

  }
}

