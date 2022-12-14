import { createContext, useReducer } from 'react'

export const MenusContext = createContext()

export const menusReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MENUS':
            return {
                menus: action.payload
            }
        case 'CREATE_MENU':
            return {
                menus: [action.payload, ...state.menus]
            }
        case 'DELETE_MENU':
            return {
                menus: state.menus.filter((m) => m._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const MenusContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(menusReducer, {
        menus: null
    })
    // dispatch({type: 'SET_MENUS', payload: [{}, {}]})

    return (
        <MenusContext.Provider value={{...state, dispatch}}>
            { children }
        </MenusContext.Provider>
    )
}