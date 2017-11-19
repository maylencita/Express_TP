export interface ServerState {
    users: Array<User>
    channels: Array<Channel>
    messages: Array<Message>
}

export type User = {
    pseudo: String,
    status: Status,
    points: Number
}

export type Status =
    Connecte |
    Deconnecte |
    Suspendu

type Connecte = "Connecte"

type Deconnecte = "Deconnecte"

type Suspendu = "Suspendu"

export type Message =
    Question |
    Reponse |
    Note

export type Question = {
    contenu: String
}

export type Reponse = {
    contenu: String
}

type Note = {
    note: Number
}

export type Channel = {
    nom: String,
    createur: User,
    listeParticipant: User[]
}

type Serveur = {
    listeUser: User[],
    listeChannel: Channel[],
    listeMessage: Message[]
}
