import * as React from 'react'
import 'react-native'
import * as renderer from 'react-test-renderer'
import { App } from './app'

test('renders correctly', () => {
  const tree = renderer.create(
    <App />,
  )
  expect(tree).toBeDefined()
})