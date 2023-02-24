import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { RoutesManager } from './components'
import { RoutesWithNotFound } from './utilities'
const HomePokemon = lazy(() => import('./pages/HomePokemon/HomePokemon'))

function App() {
  return (
    <div className='App'>
      <RoutesManager>
        <RoutesWithNotFound>
          <Route path='/' element={<HomePokemon />} />
        </RoutesWithNotFound>
      </RoutesManager>
    </div>
  )
}

export default App
