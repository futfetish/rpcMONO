import { $api } from "../api"

interface GameServerI {
    joinMatchMaking : () => void
}

class GameServer implements GameServerI {
    joinMatchMaking() {
        return $api.get<void>('/game/joinMatchMaking')
    }
}

export const GameServerClient = new GameServer()