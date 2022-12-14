import { useContext } from "react"
import { RecipeContext } from "../context/RecipeContext"

export const useRecipesContext = () => {
    const context = useContext(RecipeContext)
    if (!context) {
        throw Error('useRecipesContext must be used inside an RecipesContextProvider')
    }
    return context
}
