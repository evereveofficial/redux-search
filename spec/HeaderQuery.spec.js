import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import HeaderQuery from '../src/HeaderQuery'
import RangeQuery from '../src/RangeQuery'

function setup(header) {
  let props = {
    onQueryChange: expect.createSpy(),
    header
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<HeaderQuery {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('HeaderQuery', () => {
  describe('when header uses a range query', () => {
    const header = { query: { type: 'range' } }
    const { output } = setup(header)

    it('should render a RangeQuery component', () => {
      expect(output.type).toBe(RangeQuery)
    })
  })
})

