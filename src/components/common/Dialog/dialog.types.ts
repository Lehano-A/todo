export interface DialogProps {
  style?: DialogStyledProps
  title?: string
  handleCloseDialog?: () => void
}

export interface DialogStyledProps {
  maxWidth?: string
}
