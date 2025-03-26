import { createGlobalStyle } from 'styled-components'

import RubikLightTtf from './Rubik/Rubik-Light.ttf'
import RubikLightWoff from './Rubik/Rubik-Light.woff'
import RubikLightWoff2 from './Rubik/Rubik-Light.woff2'
import RubikMediumTtf from './Rubik/Rubik-Medium.ttf'
import RubikMediumWoff from './Rubik/Rubik-Medium.woff'
import RubikMediumWoff2 from './Rubik/Rubik-Medium.woff2'
import RubikRegularTtf from './Rubik/Rubik-Regular.ttf'
import RubikRegularWoff from './Rubik/Rubik-Regular.woff'
import RubikRegularWoff2 from './Rubik/Rubik-Regular.woff2'
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

@font-face {
  font-family: "Rubik-Light";
  src: local("Rubik Light"),
    local("Rubik-Light"),
    url(${RubikLightWoff2}) format("woff2"),
    url(${RubikLightWoff}) format("woff"),
    url(${RubikLightTtf}) format("ttf");
  font-weight: normal;
}

@font-face {
  font-family: "Rubik-Regular";
  src: local("Rubik Regular"),
    local("Rubik-Regular"),
    url(${RubikRegularWoff2}) format("woff2"),
    url(${RubikRegularWoff}) format("woff"),
    url(${RubikRegularTtf}) format("ttf");
  font-weight: normal;
}

@font-face {
  font-family: "Rubik-Medium";
  src: local("Rubik Medium"),
    local("Rubik-Medium"),
    url(${RubikMediumWoff2}) format("woff2"),
    url(${RubikMediumWoff}) format("woff"),
    url(${RubikMediumTtf}) format("ttf");
  font-weight: normal;
}
`
