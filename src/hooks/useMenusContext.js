import { useContext } from "react"
import { MenusContext } from "../context/MenuContext"

export const useMenusContext = () => {
    const context = useContext(MenusContext)
    if (!context) {
        throw Error('useMenusContext must be used inside an MenusContextProvider')
    }
    return context
}
