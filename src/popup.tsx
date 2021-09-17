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
    background-color: black;
    color: white;
    font-family: Sans-Serif;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 300px;
    height: 400px;
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