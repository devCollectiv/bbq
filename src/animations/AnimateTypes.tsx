export type FireworksFramerInitial = {
  opacity: number,
  scale: number,
  position: 'absolute'| 'relative',
  top?: string | number,
  left?: string | number,
  right?: string | number,
  bottom?: string | number
}

export type FireworksFramerAnimate = {
  opacity: number[] | number,
  scale: number[] | number
}

export type FireworksFramerTransition ={
  duration: number,
  delay: number
}