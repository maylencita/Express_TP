import { Response, Request } from "express";
import { User, Channel } from '../models'; 
import store from '../models/store'

export function addUser(request: Request, response: Response){
  const user:User = {pseudo:request.body.pseudo, status: "Deconnecte", points:0};
  store.addUser(user);
  response.send(user);
} 
export function createChannel(request: Request, response: Response){
  if(request.body.user.points>=1)
	{
		const channel:Channel = {nom:request.body.nom, createur:request.body.user, participants:[request.body.user], messages: []};
		store.addChannel(channel);
	}
  response.send();
} 

 //Crée un chanel sans participants. Vérifier points >= 1
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

export function getChannels(request: Request, response: Response){
  response.send({ channels: store.state.channels})
}