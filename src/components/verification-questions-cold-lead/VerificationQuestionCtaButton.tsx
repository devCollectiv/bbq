import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import blckTwttrTheme from '../theme/Theme'
import { Button, CircularProgress, Typography } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    borderRadius: '10px',
    padding: theme.spacing(1, 5),
    boxShadow: '6px 6px #b2b2b2',
    [theme.breakpoints.down('xs')]: {
      boxShadow: '4px 4px #b2b2b2'
    }
  },
  disabledButton: {
    marginTop: theme.spacing(1)
  }
}))

interface IProps {
  onClicked(e: any): void
  isLoading: boolean
  buttonText: string
  disabledButtonText?: string
  isDisabled: boolean
}

const VerificationQuestionCtaButton: FunctionComponent<IProps> = (props) => {
  const classes = useStyles(blckTwttrTheme)
  React.useEffect(() => {

  }, [])

  return (
    <Button
      color='primary'
      variant='contained'
      disabled={props.isDisabled}
      aria-label={`next question`}
      classes={{disabled: classes.disabledButton}}
      className={classes.button}
      fullWidth
      onClick={props.onClicked}
    >
      {!props.isLoading &&
        <Typography style={{fontFamily: 'Youth'}} variant='button'
                    align='center'>{props.isDisabled ? props.disabledButtonText : props.buttonText}</Typography>}
      {props.isLoading && <CircularProgress color='inherit' size='22px'/>}
    </Button>
  )
}

export default VerificationQuestionCtaButton