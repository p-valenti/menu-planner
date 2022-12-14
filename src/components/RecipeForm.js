import { useState } from "react"
import { useRecipesContext } from "../hooks/useRecipesContext"
import { useAuthContext } from "../hooks/useAuthContext"

const RecipeForm = () => {
    const { dispatch } = useRecipesContext()
    const { user } = useAuthContext()
    const [name, setName] = useState('')
    const [preparation, setPreparation] = useState('')
    const [cooking, setCooking] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [text, setText] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('You must be logged in')
            return
        }
        const recipe = {name, preparation, cooking, ingredients, text}
        const response = await fetch('/api/recipes', {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setName('')
            setPreparation('')
            setCooking('')
            setIngredients('')
            setText('')
            setError(null)
            setEmptyFields([])
            console.log('new recipe added', json)
            dispatch({type: 'CREATE_RECIPE', payload: json})
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Recipe</h3>
            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
            />
            <label>Time of preparation:</label>
            <input
                type="number"
                onChange={(e) => setPreparation(e.target.value)}
                value={preparation}
                className={emptyFields.includes('timeOfPreparation') ? 'error' : ''}
            />
            <label>Time of cooking:</label>
            <input
                type="number"
                onChange={(e) => setCooking(e.target.value)}
                value={cooking}
                className={emptyFields.includes('timeOfCooking') ? 'error' : ''}
            />
            <label>Ingredients:</label>
            <input
                type="text"
                onChange={(e) => setIngredients(e.target.value)}
                value={ingredients}
                className={emptyFields.includes('ingredients') ? 'error' : ''}
            />
            <label>Recipe:</label>
            <input
                type="text"
                onChange={(e) => setText(e.target.value)}
                value={text}
                className={emptyFields.includes('recipeText') ? 'error' : ''}
            />
            <button>Add Recipe</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default RecipeForm