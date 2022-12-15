import { useState } from "react"
import { useRecipesContext } from "../hooks/useRecipesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import DurationPicker from 'react-duration-picker';

const RecipeForm = () => {
    const { dispatch } = useRecipesContext()
    const { user } = useAuthContext()
    const [name, setName] = useState('')
    const emptyDuration = {hours: 0, minutes: 0, seconds: 0};
    const [prepTime, setPrepTime] = useState(emptyDuration)
    const [cookTime, setCookTime] = useState(emptyDuration)
    const [ingredients, setIngredients] = useState('')
    const [instruction, setInstruction] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('You must be logged in')
            return
        }

        const toSeconds = (duration) => {
            const {hours, minutes, seconds} = duration;
            return hours * 3600 + minutes * 60 + seconds;
        }

        const prepTimeSec = toSeconds(prepTime);
        const cookTimeSec = toSeconds(cookTime)
        const recipe = {name, prepTimeSec, cookTimeSec, ingredients, instruction}
        const response = await fetch('${process.env.REACT_APP_API_PROXY}/api/recipes', {
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
            setPrepTime(emptyDuration)
            setCookTime(emptyDuration)
            setIngredients('')
            setInstruction('')
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
                required="required"
                className={emptyFields.includes('name') ? 'error' : ''}
            />
            <label>Time of preparation:</label>
            <DurationPicker
                onChange={(e) => setPrepTime(e)}
                initialDuration={emptyDuration}
                maxHours={5}
            />
            <label>Time of cooking:</label>
            <DurationPicker
                onChange={(e) => setCookTime(e)}
                initialDuration={emptyDuration}
                maxHours={5}
            />
            <label>Ingredients:</label>
            <input
                type="text"
                onChange={(e) => setIngredients(e.target.value)}
                value={ingredients}
                required="required"
                className={emptyFields.includes('ingredients') ? 'error' : ''}
            />
            <label>Recipe:</label>
            <input
                type="text"
                onChange={(e) => setInstruction(e.target.value)}
                value={instruction}
                required="required"
                className={emptyFields.includes('recipeText') ? 'error' : ''}
            />
            <button>Add Recipe</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default RecipeForm