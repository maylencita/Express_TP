import { ServerState, User, Channel } from '../models'

class Store {
 state: ServerState = {
   users: [],
   channels: [],
   messages: []   
 }

 addUser(user: User){
   this.state = {
     ...this.state,
     users: [...this.state.users, user]
   }
 }

 addChannel(channel: Channel){
    this.state = {
      ...this.state,
      channels: [...this.state.channels, channel]
    }
  }
}

const store = new Store()

export default store