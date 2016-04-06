import React, { PropTypes } from "react"
import classnames from 'classnames'
import _ from 'lodash'

export default class Pagination extends React.Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired
  }

  allPages() {
    const { search } = this.props

    if(search.total_count && search.limit) {
      let numPages = Math.floor(search.total_count / search.limit) + 1
      if (search.total_count > 0 && search.total_count % search.limit === 0)
        numPages--

      let pages = _.range(1, numPages + 1)

      return pages
    } else {
      return []
    }
  }

  pages() {
    const { search } = this.props

    if(!search.total_count)
      return []

    const pageSlots = 7
    const all = this.allPages()

    if(all.length > pageSlots) {
      let slots = [1]

      if(search.page >= (pageSlots-2)) {
        slots.push("...")

        if(search.page < all[all.length-5]) {
          slots.push(search.page-1)
          slots.push(search.page)
          slots.push(search.page+1)
          slots.push("...")
          slots.push(all[all.length-1])
        } else {
          slots.push(all[all.length-5])
          slots.push(all[all.length-4])
          slots.push(all[all.length-3])
          slots.push(all[all.length-2])
          slots.push(all[all.length-1])
        }

        return slots
      } else {
        slots.push(2)
        slots.push(3)
        slots.push(4)
        slots.push(5)
        slots.push("...")
        slots.push(all[all.length-1])

        return slots
      }
    } else {
      return all.slice(0, pageSlots)
    }
  }

  handlePageClick(page, ev) {
    ev.preventDefault()

    if(page !== this.props.search.page)
      this.props.onPageChange(page)
  }

  ignorePageClick(ev) {
    ev.preventDefault()
  }

  previous() {
    const { search } = this.props
    const arePreviousPages = _.first(this.pages()) !== search.page
    const previousPage = search.page - 1

    const classes = classnames('paginate_button', 'previous', {
      disabled: !arePreviousPages
    })

    return (
      <li className={classes}>
        <a href="#" onClick={arePreviousPages ? this.handlePageClick.bind(this, previousPage) : this.ignorePageClick}>Previous</a>
      </li>
    )
  }

  next() {
    const { search } = this.props
    const areMorePages = _.last(this.pages()) !== search.page
    const nextPage = search.page + 1

    const classes = classnames('paginate_button', 'next', {
      disabled: !areMorePages
    })

    return (
      <li className={classes}>
        <a href="#" onClick={areMorePages ? this.handlePageClick.bind(this, nextPage) : this.ignorePageClick}>Next</a>
      </li>
    )
  }

  renderPage(page, key) {
    const currentPage = this.props.search.page

    const classes = classnames('paginate_button', {
      active: currentPage === parseInt(page)
    })

    return (
      <li key={key} className={classes}>
        <a href="#" onClick={this.handlePageClick.bind(this, page)}>{page}</a>
      </li>
    )
  }

  renderBreakPage(key) {
    return (
      <li key={key} className="paginate_button disabled">
        <a href="#" onClick={this.ignorePageClick}>...</a>
      </li>
    )
  }

  render() {
    const pages = this.pages().map((page, idx) =>
      page === "..." ? this.renderBreakPage(idx) : this.renderPage(page, idx))

    return (
      <div className="dataTables_paginate paging_simple_numbers">
        <ul className="pagination">
          {this.previous()}
          {pages}
          {this.next()}
        </ul>
      </div>
    )
  }
}

