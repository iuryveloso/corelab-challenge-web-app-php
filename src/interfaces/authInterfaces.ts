export interface Credentials {
  old_password: string
  password: string
  password_confirmation: string
}

export interface Errors {
  errors: {
    name?: Array<string>
    email?: Array<string>
    file?: Array<string>
    password?: Array<string>
  }
}

export interface Message {
  message: string
}

export interface Token {
  token: string
}
