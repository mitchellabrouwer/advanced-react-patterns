// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()
ToggleContext.displayName = 'ToggleContext'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return (
    <ToggleContext.Provider value={{on, toggle}}>
      {children}
    </ToggleContext.Provider>
  )
}

function useToggle() {
  const context = React.useToggle(ToggleContext)
  if (!context) {
    throw Error('useToggle must be used inside of <Toggle />')
  }
  return context
}

function ToggleOn({children}) {
  const {on} = useToggle(ToggleContext)
  return on ? children : null
}

function ToggleOff({children}) {
  const {on} = useToggle(ToggleContext)
  return on ? null : children
}

function ToggleButton({...props}) {
  const {on, toggle} = useToggle(ToggleContext)
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
