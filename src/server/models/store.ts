import { ServerState, User, Channel } from '../models'

export class Store {
    state: ServerState = {
        users: [],
        channels: [],
        messages: []
    }

    addUser(user: User) {
        if (this.state.users.map(user => user.pseudo).indexOf(user.pseudo) == -1) {
            this.state = {
                ...this.state,
                users: [...this.state.users, user]
            }
        }
    }

    addChannel(channel: Channel) {
        if (this.state.channels.map(channel => channel.nom).indexOf(channel.nom) == -1) {
            this.state = {
                ...this.state,
                channels: [...this.state.channels, channel]
            }
        }
    }

    addUserToChannel(user: User, channel: Channel) {
        const channels = this.state.channels;
        if (this.state.users.map(user => user.pseudo).indexOf(user.pseudo) > -1 && this.state.channels.map(channel => channel.nom).indexOf(channel.nom) > -1) {
            for (const i of channels) {
                if (i.nom == channel.nom) {
                    i.listeParticipant.push(user);
                    break;
                }
            }
        }
        this.state = {
            ...this.state,
            channels: channels
        }

    }

    getChannel(nom: string) {
        for (const i of this.state.channels) {
            if (i.nom == nom) {
                return i;
            }
        }
    }

    channels() {
        return this.channels;
    }
}

const store = new Store()

export default store
