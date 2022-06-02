import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Card, Grid } from '@material-ui/core'
import { TouchApp } from '@material-ui/icons'
import blckTwttrTheme from '../../../abReplica/common/Theme'
import cmsClient, { SanityImage } from '../../../abReplica/cmsClient'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {
  imageSrc?: SanityImage
}

const VerificationQuestionImage: FunctionComponent<IProps> = (props) => {
  const classes = useStyles(blckTwttrTheme)
  React.useEffect(() => {

  }, [])

  return (
    <Grid item xs={12} sm={6} container justifyContent='center'>
      {props.imageSrc && <Card style={{
        overflow: 'scroll',
        borderRadius: '16px',
        position: 'relative',
        height: 400,
        width: props.imageSrc.asset.metadata.dimensions.aspectRatio * 400
      }}>
        <img src={
          cmsClient.utils
            .urlFor(props.imageSrc)?.height(400)
            .width(Math.floor(props.imageSrc.asset.metadata.dimensions.aspectRatio * 400))
            .fit('scale')
            .url() ?? ''}/>

        <TouchApp fontSize='large' color='primary' style={{opacity: .8, position: 'absolute', bottom: '32px', right: '32px'}}/>
      </Card>}
    </Grid>
  )
}

export default VerificationQuestionImage