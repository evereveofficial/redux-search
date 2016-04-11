import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import QueryInput, {KeyPressInput, CompletedInput} from '../src/QueryInput'

function setup(updateOnKeyPress) {
  let props = {
    queryChange: expect.createSpy,
    header: {},
    updateOnKeyPress
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<QueryInput {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('QueryInput', () => {
  describe('when configured to update on keypress', () => {
    const { output } = setup(true)

    it('should render a KeyPressInput component', () => {
      expect(output.type).toBe(KeyPressInput)
    })
  })

  describe('when configured to update on complete', () => {
    const { output } = setup(false)

    it('should render a CompletedInput component', () => {
      expect(output.type).toBe(CompletedInput)
    })
  })
})

