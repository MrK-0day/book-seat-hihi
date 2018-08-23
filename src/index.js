import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import * as hihi from './Components/Apollo'
import Router from './Components/Router'
import store from './Rematch/store'

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <ApolloProvider client={hihi.Client}>
        <Router />
      </ApolloProvider>
    </Provider>
  </CookiesProvider>
  , document.getElementById('root'))
registerServiceWorker()
