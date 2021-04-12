import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #F0F0F5 url('/bg-github.svg') no-repeat 70% top;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px 'Roboto', sans-serif;
  }

  :root {
    max-width: 960px;
    margin: 0 auto;
    padding: 80px 60px;
  }

  button {
    cursor: pointer;
  }
`
