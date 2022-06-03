import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Button, Card, Modal, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import blckTwttrTheme from '../../theme/Theme'

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    backgroundColor: 'whitesmoke !important',
    border: '2px solid #000'
  },
  modalProgressBar: {
    height: theme.spacing(1),
    width: '100%',

    backgroundColor: 'whitesmoke',
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: theme.palette.text.secondary
    }
  }
}))

type IProps = {
  open: boolean,
}


const AddVerificationQuestionModal: FunctionComponent<IProps> = (props: IProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  React.useEffect(() => {
    setIsOpen(props.open)
  }, [props.open])

  return (
    <Modal
      open={isOpen}
      style={{height: 'max-content',  margin: 'auto'}}
    >
      <Grid
        container
        item
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs={10}>

        <Card
          style={{backgroundColor: blckTwttrTheme.palette.background.default}}
        >
        <Grid container direction='column' item spacing={3}>
          <Grid container item>
            <Grid container item style={{
              padding: blckTwttrTheme.spacing(2.5)
            }}  alignItems='stretch'>
              <Grid item xs={2}/>
              <Grid container item xs={8}>
                <Grid container item justifyContent='center'>
                  <Typography
                    style={{fontFamily:"Youth"}}
                    variant='h6'
                    align='center'
                    color='secondary'
                  >Submit a Question to the list.</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={2} justifyContent='flex-end'>
                <Grid item>
                  <Button>
                    <Close onClick={() => setIsOpen(false)} fontSize='small'/>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item direction='column'>
            <Grid container item style={{height: 'max-content'}}>
            {/*  image upload */}
            {/*  question input  */}
            {/*  correct answer */}
            [{/*  type of incorrect answer */}]
              OR
            [{/*  incorrect answer */}
            {/*  incorrect answer */}
            {/*  incorrect answer */}]
            {/*  category picker or other */}
            </Grid>
          </Grid>
        </Grid>
        </Card>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default AddVerificationQuestionModal
