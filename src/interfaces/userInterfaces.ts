export interface User {
  name: string
  email: string
  avatar: string
}

export interface Errors {
  errors: {
    name?: Array<string>
    email?: Array<string>
    file?: Array<string>
    old_password?: Array<string>
    password?: Array<string>
  }
}

export interface Message {
  message: string
}

export interface Unauthenticated {
  unauthenticated: boolean
}
