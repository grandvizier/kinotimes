import React from 'react';
import { Route, Link } from 'react-router-dom'
import Film from '../film'
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