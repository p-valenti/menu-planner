import { useEffect } from "react"
import { useMenusContext } from "../hooks/useMenusContext"
import { useAuthContext } from "../hooks/useAuthContext"
import MenuDetails from '../components/MenuDetails'
import MenuForm from "../components/MenuForm"

const Menu = () => {
    const {menus, dispatch} = useMenusContext()
    const {user} = useAuthContext()
    useEffect(() => {
        const fetchMenus = async () => {
            const response = await fetch('/api/menus', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({type: 'SET_MENUS', payload: json})
            }
        }
        if (user) {
            fetchMenus()
        }
    }, [dispatch, user])
    return (
        <div className="home">
            <div className="menus">
                {menus && menus.map((menu) => (
                    <MenuDetails key={menu._id} menu={menu} />
                ))}
            </div>
            <MenuForm />
        </div>
    )
}

export default Menu