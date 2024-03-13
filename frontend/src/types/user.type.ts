type Role = 'User' | 'Admin'

export interface IUser {
  _id: string
  avatar?: string
  roles: Role[]
  email: string
  name?: string
  date_of_birth?: string // iso 8601 date string
  address?: string
  phone?: string
  createdAt: string
  updatedAt: string
}
