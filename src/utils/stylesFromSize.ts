/* eslint-disable import/prefer-default-export */
export const stylesFromSize = (
  value: string,
  styles: { [key: string]: string }
) => ({
  [styles.sm]: value === 'sm',
  [styles.md]: value === 'md',
  [styles.lg]: value === 'lg',
})
