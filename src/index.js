import React                     from 'react'
import ReactDOM                  from 'react-dom'
import { Provider }              from 'react-redux'
import store, { history }        from './wp-react/store'
import { Router }                from 'react-router-dom'
import App                       from './App'

import runtime from "serviceworker-webpack-plugin/lib/runtime"

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'));

//Service Worker Stuff
if("serviceWorker" in navigator){
  console.log('[SW] Hello!')
  runtime.register()
}
