import { useAuthContext } from './useAuthContext'
import { useMenusContext } from './useMenusContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: menusDispatch } = useMenusContext()
  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')
    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    menusDispatch({type: 'SET_MENUS', payload: null})
  }
  return { logout }
}