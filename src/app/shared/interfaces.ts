export interface UserAuthData {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
  localId: string
}

export interface Post{
  id?: string
  title:string
  text:string
  author:string
  date:Date
  likeList?:string[]
  commentList?:Commentary[]
}

export interface FbCreateResponse{
  name:string
}

export interface User {
  uid?: string
  firstName:string
  lastName:string
  birthDay?: Date
  regDate?:Date
  email?:string
  photoUrl?: string
  subscriptions?: string[]
}

export interface Commentary{
    id?:string
    authorId?:string
    date:Date
    text:string
}