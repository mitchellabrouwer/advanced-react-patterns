// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import React from "react"
import { Switch } from "../switch"

function Toggle({ children }) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return React.Children.map(children, (child) => {
    // note can limit to specific components using includes on an allowedTypes array
    if (typeof child === "string") {
      return child
    } else {
      return React.cloneElement(child, { on, toggle })
    }
  })
}

const ToggleOn = ({ on, children }) => (on ? children : null)
const ToggleOff = ({ on, children }) => (on ? null : children)
const ToggleButton = ({ on, toggle }) => <Switch on={on} onClick={toggle} />

const CustomMessage = ({ on, toggle }) => (on ? "this be on" : "doh off")

// allowedTypes = [ToggleOn, ToggleOff, ToggleButton]

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
        <CustomMessage />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
