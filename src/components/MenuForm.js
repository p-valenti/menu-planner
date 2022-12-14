import { useState } from "react"
import { useMenusContext } from "../hooks/useMenusContext"
import { useAuthContext } from "../hooks/useAuthContext"

const MenuForm = () => {
    const { dispatch } = useMenusContext()
    const { user } = useAuthContext()
    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [list, setList] = useState([])
    const [name, setName] = useState('')

    function handleChange(event) {
        setName(event.target.value);
    }

    function handleAmount(event) {
        setAmount(event.target.value);
    }

    function handleAdd() {
        const newList = list.concat({name, amount});
        setList(newList);
        setName('')
        setAmount(0)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('You must be logged in')
            return
        }
        const menu = {date, title, list}
        let body = JSON.stringify(menu);
        const response = await fetch('/api/menus', {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        console.log(emptyFields)
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setDate('')
            setTitle('')
            setAmount('')
            setError(null)
            setEmptyFields([])
            console.log('new menu added', json)
            dispatch({type: 'CREATE_MENU', payload: json})
            setList([])
            setName('')
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Menu</h3>
            <label>Date:</label>
            <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                className={emptyFields.includes('date') ? 'error' : ''}
            />
            <label>Meal:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Dishes:</label>
            <ul>
                {list.map((item, index) => (
                    <li key={index}>{item.name} - {item.amount}</li>
                ))}
            </ul>
            <div>
                <input type="text" value={name} onChange={handleChange}/>
                <input type="number"
                       value={amount}
                       onChange={handleAmount}
                       className={emptyFields.includes('amount') ? 'error' : ''}/>
                <button type="button" onClick={handleAdd}>
                    Add
                </button>
            </div>
            <button>Add Menu</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default MenuForm