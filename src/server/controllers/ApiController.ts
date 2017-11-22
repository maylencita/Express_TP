import { Response, Request } from "express";
import { User, Channel, Message, Question, Reponse, Note } from '../models'; 
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

// export function inviteUser(request: Request, response: Response){
//   var channel:Channel = store.state.channels.find( (channel) =>{
//     return channel.nom === request.body.nomChannel
//   });
//   if (channel !== undefined){
//     var user:User = channel.participants.find( (user) =>{
//       return user.pseudo === request.body.userPseudo
//     });

//     if (user !== undefined && (channel.createur===user||user.points>=2)){
//       channel.participants.push();
//     }
//   }
//   response.send();
// }
  

// 	if(index!==-1)
// 	{
// 		serveur.channels[indexChannel].participants.push(newUser);
// 	}
// 	return serveur;
// }
//   (user: User, contexte: {}, nomChannel: string, upserPseudo: string) {} //Vérifier user is owner ou points >= 2; Ajoute un utilisateur à un channel


// request body : 
// channel : Channel 
// user : User
export function readChannel(request: Request, response: Response){
  let messages:Message[]  = []; 
	if(request.body.channel.participants.indexOf(request.body.user)!==-1)
	{
		for(let id in request.body.channel.messages)
		{
			messages.push(store.state.messages[id]);
		}
	}
  response.send(messages);
} 

// message : Message
export function sendQuestion(request: Request, response: Response){  
  const question:Question = request.body.message;
	
  for(let channel in question.destination){
    if(question.destination[channel].participants.indexOf(question.emetteur)!==-1)
    {
    if(store.state.users[store.state.users.indexOf(question.emetteur)].points===0)
    {
      store.state.users[store.state.users.indexOf(question.emetteur)].points++;
    }
      store.state.channels[store.state.channels.indexOf(question.destination[channel])].messages.push(question.id);
    }
  }
  store.state.messages.push(question);
  response.send();
}

// message : Message
// nomChannel : String 
export function sendAnswer(request: Request, response: Response){  
  const reponse:Reponse = request.body.message;
  const sourceMessage:Message = store.state.messages[reponse.idQuestion];
  const channel: Channel = store.state.channels.find((channel) =>{
    return channel.nom === request.body.nomChannel
  });
  if((channel.participants.indexOf(reponse.emetteur)!==-1 && reponse.emetteur.points>=3)||reponse.emetteur.points===5)
	{
		store.state.messages.push(reponse);
		store.state.channels[store.state.channels.indexOf(channel)].messages.push(reponse.id);
	}
  response.send();
}

// note : Note
// channelName : String
export function noteQuestion(request: Request, response: Response){  
  const note:Note = request.body.note;
  const channel: Channel = store.state.channels.find((channel) =>{
    return channel.nom === request.body.nomChannel
  });
  if(channel.participants.indexOf(note.emetteur)!==-1 && note.emetteur.points>=1)
	{
		store.state.messages.push(note);
		store.state.channels[store.state.channels.indexOf(channel)].messages.push(note.id);
		calculerPoints(note.emetteur);
	}
  response.send();
}

// note : Note
// channelName : String
export function noteAnswer(request: Request, response: Response){  
  const note:Note = request.body.note;
  const channel: Channel = store.state.channels.find((channel) =>{
    return channel.nom === request.body.nomChannel
  });
  if(channel.participants.indexOf(note.emetteur)!==-1 && note.emetteur.points>=2)
	{
		store.state.messages.push(note);
		store.state.channels[store.state.channels.indexOf(channel)].messages.push(note.id);
		calculerPoints(note.emetteur);
	}
  response.send();
}

// user: User
// userPseudo : String
export function suspendUser(request: Request, response: Response){  
  if(request.body.user.points===5)
	{
    const userToSuspend: User = store.state.users.find((user) =>{
      return user.pseudo === request.body.userPseudo
    });
		userToSuspend.status="Suspendu";
	}
  response.send();
}

function calculerPoints(user: User){ 
  var index:number = store.state.users.indexOf(user);
	if(store.state.users[index].points<5)
	{
		store.state.users[index].points++;
	}
}

export function ping(request: Request, response: Response){
  response.send({ ping: 'ok'})
}

export function getChannels(request: Request, response: Response){
  response.send({ channels: store.state.channels})
}