import React from 'react';
import { Route } from 'react-router-dom'
import Film from '../../components/App'
import Admin from '../projectionist'

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Film} />
      <Route exact path="/projectionist" component={Admin} />
    </main>
  </div>
)

export default App