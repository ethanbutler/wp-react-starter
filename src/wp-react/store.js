import { createStore, applyMiddleware, compose } from "redux"
import { routerMiddleware }                      from "react-router-redux"
import thunk                                     from "redux-thunk"
import logger                                    from "redux-logger"
import createHistory                             from "history/createBrowserHistory"
import rootReducer                               from "./reducers"
import { initialState as initialFilters }        from "./reducers/filters/filters"

import {
  parseTerms,
  parseAuthors
} from './utilities'

const taxonomyData   = require('../_data/taxonomy')
const authorsData    = require('../_data/authors')

export const history = createHistory()

const initialState = {
  isLoading: false,
  error: null,
  posts: [],
  filters: initialFilters,
  sort: {
    orderby: 'date',
    order: 'desc'
  },
  authors: parseAuthors(authorsData),
  terms: parseTerms(taxonomyData)
}

const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]

if(process.env.NODE_ENV === 'development'){
  const devToolsExtension = window.devToolsExtension
  if(typeof devToolsExtension === 'function'){
    enhancers.push(devToolsExtension)
  }
  middleware.push(logger)
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store
