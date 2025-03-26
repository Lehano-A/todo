import React, { ComponentType } from 'react'
import styled, { css } from 'styled-components'

const FakeFocus = styled('div')<{ $wrapperStyle?: React.CSSProperties }>`
  position: relative;
  padding: 2px;
  border-radius: 4px;

  &:focus-within {
    background: ${({ theme }) => theme.palette.gradients.main};
  }

  ${(props) =>
    props.$wrapperStyle &&
    css({
      ...props.$wrapperStyle,
    })}
`

interface CustomProps {
  $wrapperStyle?: React.CSSProperties
}

function withFakeFocus<T extends object>(Component: ComponentType<T>) {
  const WrappedComponent = (hocProps: T & CustomProps) => {
    const { $wrapperStyle, ...restProps } = hocProps

    if ($wrapperStyle) {
      return (
        <FakeFocus
          $wrapperStyle={$wrapperStyle}
          {...restProps}
        >
          <Component {...hocProps} />
        </FakeFocus>
      )
    }

    return (
      <FakeFocus>
        <Component {...hocProps} />
      </FakeFocus>
    )
  }

  WrappedComponent.displayName = `withFakeFocus(${Component.displayName || Component.name || 'Component'})`

  return WrappedComponent
}

export default withFakeFocus
