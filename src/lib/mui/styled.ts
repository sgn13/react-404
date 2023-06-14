import { styled } from '@mui/material/styles';
export default styled;

// import React from "react"
// import { styled as muiStyled, useTheme } from "@mui/material/styles"

// const styled = (StyledComponent, ...args) => {
//   const Component = muiStyled(StyledComponent, ...args)
//   Component.attrs = (defaultProps) =>
//     muiStyled(
//       React.memo((props) => {
//         const theme = useTheme()
//         return <StyledComponent {...defaultProps({ theme, ...props })} {...props} />
//       }),
//       ...args
//     )
//   return Component
// }

// export * from "@mui/material/styles"
// export default styled
