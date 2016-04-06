import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {Pagination} from '../src/Pagination'

function setup(search) {
  let props = {
    onPageChange: expect.createSpy(),
    search
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<Pagination {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('Pagination', () => {
  describe('when viewing the second page', () => {
    it('should render correctly', () => {
      const search = {
        limit: 10,
        total_count: 11,
        page: 2
      }

      const { output } = setup(search)
      const [ prevPage, pages, nextPage ] = output.props.children.props.children
      const [ pageOne, pageTwo ] = pages

      expect(prevPage.props.className).toBe('paginate_button previous')
      expect(nextPage.props.className).toBe('paginate_button next disabled')
      expect(pageOne.props.className).toBe('paginate_button')
      expect(pageTwo.props.className).toBe('paginate_button active')
    })
  })

  describe('when limit is greater than result count', () => {
    it('should show multiple pages', () => {
      const search = {
        limit: 10,
        total_count: 11,
        page: 1
      }

      const { output } = setup(search)
      expect(output.type).toBe('div')

      const [ prevPage, pages, nextPage ] = output.props.children.props.children
      expect(pages.length).toBe(2)

      const [ pageOne, pageTwo ] = pages

      expect(prevPage.props.className).toBe('paginate_button previous disabled')
      expect(nextPage.props.className).toBe('paginate_button next')
      expect(pageOne.props.className).toBe('paginate_button active')
      expect(pageTwo.props.className).toBe('paginate_button')

      const anchorText = pageTwo.props.children.props.children
      expect(anchorText).toBe(2)
    })
  })

  describe('when limit is equal to result count', () => {
    it('should show a single page', () => {
      const search = {
        limit: 10,
        total_count: 10,
        page: 1
      }

      const { output } = setup(search)
      expect(output.type).toBe('div')

      const [ prevPage, pages, nextPage ] = output.props.children.props.children
      expect(pages.length).toBe(1)

      const pageOne = pages[0]

      expect(prevPage.props.className).toBe('paginate_button previous disabled')
      expect(nextPage.props.className).toBe('paginate_button next disabled')
      expect(pageOne.props.className).toBe('paginate_button active')

      const anchorText = pageOne.props.children.props.children
      expect(anchorText).toBe(1)
    })
  })
})

