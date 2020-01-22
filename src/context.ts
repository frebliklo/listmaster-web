import { createContext } from 'react'

interface AuthContextType {
  user: firebase.User | null
  profileCompleted: boolean | null
  setProfileCompleted: React.Dispatch<React.SetStateAction<boolean | null>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  profileCompleted: null,
  setProfileCompleted: () => {},
  loading: true,
  setLoading: () => {},
})
