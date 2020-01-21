import { createContext } from 'react'

interface AuthContextType {
  user: firebase.User | null
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setLoading: () => {},
})
