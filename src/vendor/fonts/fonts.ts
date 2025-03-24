import { createGlobalStyle } from 'styled-components'

import SlackeyRegularTtf from './Slackey/Slackey-Regular.ttf'
import SlackeyRegularWoff from './Slackey/Slackey-Regular.woff'
import SlackeyRegularWoff2 from './Slackey/Slackey-Regular.woff2'

export default createGlobalStyle`
@font-face {
  font-family: "Slackey";
  src: local("Slackey Regular"),
    local("Slackey-Regular"),
    url(${SlackeyRegularWoff2}) format("woff2"),
    url(${SlackeyRegularWoff}) format("woff"),
    url(${SlackeyRegularTtf}) format("ttf");
  font-weight: normal;
}
`
