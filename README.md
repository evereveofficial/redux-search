![BuildStatus](https://travis-ci.org/ackmann-dickenson/redux-search.svg?branch=master)

# redux-search

A redux implementation to easily add search, sort, and pagination to any result set.

## Installation

```javascript
npm i @ackmann-dickenson/redux-search
```

## Usage

Generally speaking, there are three locations where you'll want to include `ReduxSearch`.

### 1. Connect to your app's reducers

This package relies on a reducer to manage its state, and the `SearchTable` component expects that state to be available in a given variable. Because of this,
when your main application reducer is connecting all of its specific reducers, you'll need to include this package's reducer as well, like so:

```javascript
import {combineReducers} from 'redux'
import {routerStateReducer} from 'redux-router'
import ReduxSearch from '@ackmann-dickenson/redux-search'

const rootReducer = combineReducers({
  router: routerStateReducer,
  reduxSearches: ReduxSearch.reduxSearches
})

export default rootReducer

```

### 2. Render the ReduxSearch.SearchTable component

The heart of this package is a component that displays a datatable with searching, sorting, and pagination. It requires a function that you'll use to fetch the data to
populate the table. The actual table rows must also be provided as a prop that is a function of your application state, which would be updated every time the supplied
fetch function is called. Here's an example component.

```javascript
import React, {PropTypes} from 'react'
import ReduxSearch from '@ackmann-dickenson/redux-search'
import {searchProducts} from './actions'

const headers = [{
  field: 'name',
  label: 'Name',
  isSortable: true,
  query: { type: 'like' }
}, {
  field: 'price',
  label: 'Price',
  isSortable: true,
  query: { type: 'range' }
}]

export default class ProductsDataTable extends React.Component {
  static propTypes = {
    rows: PropTypes.object.isRequired
  }


  render() {
    return (
      <ReduxSearch.SearchTable
        {...this.props}
        fetch={searchProducts}
        searchId={'products-index'}
        field={'name'}
        headers={headers}
        rows={this.props.rows} />
    )
  }
}
```

###3. Access your search state from your action creator

When the component is rendered, it will dispatch an action that causes the state to be updated with a new search. In order to access that state from your action creator,
your function will need to accept a `searchId` parameter and retrieve the state using some utilities provided by the package. E.g.

```javascript
import api from "root/api"
import ReduxSearch from '@ackmann-dickenson/redux-search'

export const PRODUCTS_REQUESTED = "PRODUCTS_REQUESTED"
export const PRODUCTS_RECEIVED = "PRODUCTS_RECEIVED"
export const PRODUCTS_RECEIVED_ERROR = "PRODUCTS_RECEIVED_ERROR"

export function searchProducts(searchId) {
  return function(dispatch, getState) {
    dispatch({type: PRODUCTS_REQUESTED})

    const search = ReduxSearch.querify(getState(), searchId, 'name')

    return api.getProducts(search).then(resp => {
      dispatch({
        type: PRODUCTS_RECEIVED,
        results: resp.data.results
      })

      return resp
    }).catch(resp => {
      dispatch({
        type: PRODUCTS_RECEIVED_ERROR,
        errors: resp.data.errors
      })
    })
  }
}

```

### Providing table rows

It's really up to you how you provide the table rows. As long as the rows are a function of the state that your reducer is updating as a result of your action creator, the `SearchTable` will display them. Here's an example of a container component that would wrap the `ProductsDataTable` shown above.

```javascript
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {ProductsDataTable} from './ProductsDataTable'

export class Products extends React.Component {
  static propTypes = {
    products: PropTypes.object.isRequired
  }
  
  rows() {
    return this.props.products.map(p => {
      return (
        <tr key={p.product_id}>
          <td>{p.name}</td>
          <td>{p.price}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <ProductsDataTable
              rows={this.rows()} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.get("products")
  }
}

export const ProductsContainer = connect(mapStateToProps)(Products)

```

## Server side expectations
It's also expected that the JSON data coming back from the server will include a `total_count` property which is required
for the pagination to work correctly.

## Contributing

To contribute, please create a fork and submit pull requests. Pull requests from outside of the organization will not be accepted without tests.

### Testing

The test suite can be run with `npm test`. Command line debugging can be achieved with `npm test debug`. The test suite is currently minimal and needs to be expanded.
Please do not submit new work without tests.

End.
