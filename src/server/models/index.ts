export interface ServerState {
  users : Array<User>
  channels : Array<Channel>
  messages: Array<Message>
}

export type User = {
  pseudo: String
  status: Status 
  points: number
}

////

export type Status = "Connecte" | "Deconnecte" | "Suspendu"

export type Message = Question | Reponse | Note

export type Question = {
  id: number,
  contenu: String, 
  emetteur: User, 
  destination: Channel[]
}

export type Reponse = {
  id: number,
  contenu: String, 
  emetteur: User, 
  idQuestion: number
}

export type Note = {
  id: number,
  contenu: number, 
  emetteur: User, 
  idSource: number
}

export type Channel = {
  nom: String, 
  createur: User, 
  participants: User[],
  messages: number[]
}
