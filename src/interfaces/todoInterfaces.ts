export interface Todo {
  id: string;
  title: string;
  body: string;
  color:
    | "blue"
    | "teal"
    | "yellow"
    | "salmon"
    | "red"
    | "sky"
    | "pink"
    | "lime"
    | "orange"
    | "cloud"
    | "gray"
    | "brown"
    | "white";
  favorited: boolean;
}

export interface Message {
  message: string;
}

export interface Errors {
  errors: {
    title?: Array<string>;
    body?: Array<string>;
    color?: Array<string>;
    favorited?: Array<string>;
  };
}

export interface Unauthenticated {
  unauthenticated: boolean;
}
