import { Response, Request } from "express";

// export function registerUser(state: {}, user: User){} //We always pass server state
// export function createChannel(user: User, contexte: {}, nom: string){} //Crée un chanel sans participants. Vérifier points >= 1
// export function inviteUser(user: User, contexte: {}, nomChannel: string, upserPseudo: string) {} //Vérifier user is owner ou points >= 2; Ajoute un utilisateur à un channel
// export function readChannel //Vérifier appartennance 
// export function sendQuestion(nomChannel, message) //Vérifier appartennance; if points ==0 then add 1 point to user
// export function sendAnswer(nomChannel, message) //Vérifier appartennance ou super user && points >= 3
// export function noteQuestion(...) //Vérifier appartenance && points >= 1 ; récalculer points
// export function noteAnswer(...) //Vérifier appartenance && points >= 2 ; récalculer points
// export function suspendUser(userPseudo) // only super users (5 points) peuvent suspendre un utilisateur
// export function calculerPoints // selon la notation de ces questions / responses

export function ping(request: Request, response: Response){
  response.send({ ping: 'ok'})
}