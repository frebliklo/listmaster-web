import React, { useEffect, useState } from 'react'
import { auth } from 'firebase'

import { AuthContext } from './context'
import PrivateApp from './routers/PrivateApp'
import PublicApp from './routers/PublicApp'

import FullpageLoader from './components/FullpageLoader'

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    setLoading(true)

    const unsubscribe = auth().onAuthStateChanged(userState => {
      setUser(userState)

      if (loading) {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, setLoading }}>
      {loading ? <FullpageLoader /> : user ? <PrivateApp /> : <PublicApp />}
    </AuthContext.Provider>
  )
}

export default App
