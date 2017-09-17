import { combineReducers }          from "redux"
import { routerReducer as routing } from "react-router-redux"

import authors              from "./authors/authors"
import currentPage          from "./currentPage/currentPage"
import error                from "./error/error"
import filters              from "./filters/filters"
import isLoading            from "./isLoading/isLoading"
import isOffline            from "./isOffline/isOffline"
import posts                from "./posts/posts"
import sort                 from "./sort/sort"
import terms                from "./terms/terms"

export default combineReducers({
  routing,
  isLoading,
  isOffline,
  error,
  posts,
  filters,
  sort,
  authors,
  terms,
  currentPage
})
