import React from 'react'
import styles from './styles.module.css'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}


export const Button = (props) => {
  return (
    <div>
      <button
        className={props.type ? styles[props.type] : styles.primary}
        {...props}
      >
        {props.text}
      </button>
    </div>
  )
}