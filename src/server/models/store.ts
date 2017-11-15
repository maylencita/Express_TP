import { ServerState, User, Channel } from '../models'

const dummyChannels = [
  {nom: "Toto", owner: "Tata", participants_ids: []}
]

class Store {
  state: ServerState = {
    users: [],
    channels: dummyChannels,
    messages: []    
  }

  addUser(user: User){
    this.state = {
      ...this.state,
      users: [...this.state.users, user]
    }
  }

  channels() {
    return this.state.channels
  }
}

const store = new Store()

export default store