import React, { FunctionComponent, useContext } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import blckTwttrTheme from '../components/theme/Theme'
import { Grid } from '@material-ui/core'
import AnimationContext from './animation-context/AnimationContext'

export const useStyles = makeStyles((theme: Theme) => ({

}))

interface IProps {
}

const AnimationStage: FunctionComponent<IProps> = () => {
  const classes = useStyles(blckTwttrTheme)

  return (
    <Grid container item style={{height: '100vh', width: '100vw', position: "relative"}}>
      <AnimationContext.Consumer>
        {
          (value)=>{
              return value.animationStage?.map((stagedAnimation:any) => {
                return stagedAnimation
              })

          }
        }
      </AnimationContext.Consumer>


    </Grid>
  )
}

export default AnimationStage