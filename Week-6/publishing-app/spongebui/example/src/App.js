import React from 'react'

import { ExampleComponent, Button } from 'spongebui'
import 'spongebui/dist/index.css'

const App = () => {

  return (
    <>
      <ExampleComponent text="Create React Library Example 😄" />
      <div className='button-box'>
        <Button type="primary" text="Primary Button"></Button>
        <Button type="default" text="Default Button"></Button>
        <Button type="dashed" text="Dashed Button"></Button>
        <Button type="text" text="Text Button"></Button>
        <Button type="link" text="Link Button"></Button>
      </div>
    </>
  )
}

export default App
