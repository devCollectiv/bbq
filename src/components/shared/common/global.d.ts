declare module '*.module.css' {
    const classes: { [key: string]: string }
    export default classes
}
//
// declare module '*.png' {
//     const value: string
//     export default value
// }
//
// declare module '*.jpeg' {
//     const value: string
//     export default value
// }
//
declare module '*.otf' {
    const value: string
    export default value
}

declare module '*.ttf'
declare module '*.eot'
declare module '*.woff'

//
// declare module '*.svg' {
//     const value: string
//     export default value
// }

declare module '@sanity/block-content-to-react'