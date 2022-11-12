import { createContext, Dispatch } from "react"
import { PlayerAction, playerInitialState } from "../reducers/player.reducer"


export const PlayerContext = createContext({
  ...playerInitialState,
})

export const DispatchPlayerContext = createContext((() => null) as Dispatch<PlayerAction>)
