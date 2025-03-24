import React from 'react'
import styled from 'styled-components'

const Title = styled('h1')(() => ({
  fontFamily: 'Slackey',
}))

function Header() {
  return <Title> toodoo </Title>
}

export default Header
