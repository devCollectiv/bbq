import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'
import blckTwttrTheme from '../../theme/Theme'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {

}

const VerificationPageLayout: FunctionComponent<IProps> = (props) => {
  const classes = useStyles(blckTwttrTheme)

  const [headerContent, setHeaderContent] = React.useState<any>()
  const [contentContent, setContentContent] = React.useState<any>()
  const [ctaContent, setCtaContent] = React.useState<any>()

  React.useEffect(() => {
    const childrenArray = React.Children.toArray(props.children)

    setHeaderContent(childrenArray[0])
    setContentContent(childrenArray[1])
    setCtaContent(childrenArray[2])
  }, [props.children])

  return (
    <Grid container item style={{height: 'calc(100vh)', width: 'calc(100vw)', overflowX:'hidden', overflowY:'scroll'}} justifyContent='center'
          alignItems='flex-start'
          alignContent='flex-start'>
      <Grid container item style={{minHeight: '2.5%', maxHeight: '2.5%', backgroundColor: 'black'}} xs={12}>
        <Grid container item justifyContent='center'>
          <Typography color='primary' variant='subtitle2' style={{fontFamily: 'Youth'}}>
            BlckTwttr will soon be a place where we can congregate!
          </Typography>
        </Grid>
      </Grid>
      <Grid container item style={{height: '20%'}} xs={12} md={9} justifyContent='center'
            alignContent='center' alignItems='center'>
        {headerContent}
      </Grid>
      <Grid container item style={{minHeight: '400px'}} xs={12} md={9}>
        {contentContent}
      </Grid>
      <Grid container item style={{height: '20%'}} xs={12} md={9} justifyContent='center'
            alignContent='center' alignItems='center'>
        {ctaContent}
      </Grid>
      <Grid container item xs={12} md={9} justifyContent='space-between'
            style={{padding: blckTwttrTheme.spacing(0, 1), minHeight: '2.5%', maxHeight: '2.5%'}}>
        <Grid container item xs={8} alignItems='center'>
          <Typography color='secondary' variant='subtitle2'
                      style={{fontFamily: 'Youth'}}>#BlackTwitterVerificationQuestions</Typography>
        </Grid>
        <Grid container item xs={4} justifyContent='flex-end' alignItems='center'
              alignContent='center'>
            <Button href='https://twitter.com/CookoutInvitee'>
              <Typography color='primary' variant='subtitle2'>@CookoutInvitee</Typography>
            </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default VerificationPageLayout