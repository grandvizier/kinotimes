import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Admin from '../projectionist'

const App = () => (
  <div>
    <header>
      <h3>Subtle nav bar goes here</h3>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/projectionist" component={Admin} />
    </main>
  </div>
)

export default App