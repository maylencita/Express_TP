import { Response, Request } from "express";
import { User, ServerState } from "../models";
import store from "../models/store";
// export function sendQuestion(nomChannel, message) //Vérifier appartennance; if points ==0 then add 1 point to user
// export function sendAnswer(nomChannel, message) //Vérifier appartennance ou super user && points >= 3
// export function noteQuestion(...) //Vérifier appartenance && points >= 1 ; récalculer points
// export function noteAnswer(...) //Vérifier appartenance && points >= 2 ; récalculer points
// export function suspendUser(userPseudo) // only super users (5 points) peuvent suspendre un utilisateur
// export function calculerPoints // selon la notation de ces questions / responses

export function ping(request: Request, response: Response) {
    response.send({ ping: 'ok' })
}

export function getChannels(request: Request, response: Response) {
    response.send(store.channels())
}

export function registerUser(request: Request, response: Response) {
    store.addUser(request.body.user);
    response.send(store);
}

export function createChannel(request: Request, response: Response) {
    store.addChannel(request.body.channel);
    response.send(store);
} //Crée un chanel sans participants. Vérifier points >= 1

export function inviteUser(request: Request, response: Response) {
    store.addUserToChannel(request.body.user, request.body.channel);
    response.send(store);
} //Vérifier user is owner ou points >= 2; Ajoute un utilisateur à un channel

export function readChannel(request: Request, response: Response) {
    response.send(store.getChannel(request.body.name));
    } //Vérifier appartennance 
