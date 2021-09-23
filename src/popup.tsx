import 'webextension-polyfill'
import React from 'react'
import * as ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'
import App from './popup/App'


export const GlobalStyle = createGlobalStyle`
  ${normalize}
 
  body {
    padding: 0;
    background-color: #2C2C2C;
    color: white;
    font-family: Sans-Serif;

    width: 380px;
    height: 576px;

    font-size: 15px;
  }
`

const Root = () => (
  <>
    <GlobalStyle />
    <App />
  </>
)

var mountNode = document.getElementById("popup")
ReactDOM.render(<Root />, mountNode)