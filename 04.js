// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'
import {Switch} from '../switch'

function callAll(...fns) {
  return (...args) => fns.forEach(fn => fn && fn(...args))
}

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  const getTogglerProps = ({onClick, ...props} = {}) => {
    const newProps = {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
    console.log(newProps)
    return newProps
  }

  return {
    on,
    toggle,
    getTogglerProps,
  }
}

function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )

  // const {on, togglerProps} = useToggle()
  // return (
  //   <div>
  //     <Switch on={on} {...togglerProps} />
  //     <hr />
  //     <button aria-label="custom-button" {...togglerProps}>
  //       {on ? 'on' : 'off'}
  //     </button>
  //   </div>
  // )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
