import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import SimpleRequest from './SimpleRequest'
import PostExample from './PostExample'

const pages = {
  SimpleRequest,
  PostExample
}

const routes = Object.keys(pages)

function App () {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(route => (
          <Route
            key={route}
            exact
            path={`/${route}`}
            component={pages[route]}
          />
        ))}
        <Route>
          {() => (
            <ul>
              {routes.map(route => (
                <li key={route}>
                  <Link to={route}>
                    {route}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.querySelector('#demo')
)
