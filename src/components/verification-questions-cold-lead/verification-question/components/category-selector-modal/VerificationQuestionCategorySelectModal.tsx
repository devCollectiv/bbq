import React, { FunctionComponent, useContext } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Button, Card, LinearProgress, Modal, Typography } from '@material-ui/core'
import { ArrowLeft, ArrowRightAlt, Check, CheckBoxOutlineBlank, CheckBoxOutlined, Close } from '@material-ui/icons'
import blckTwttrTheme from '../../abReplica/common/Theme'
import SanityVerificationQuestionCategoryEnum, {
  SanityVerificationQuestionCategoryEnumKeys, SanityVerificationQuestionCategoryEnumType
} from '../../../common/sanityIo/SanityVerificationCategory'

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
  currentCategory: number
  handleSetCurrentCategory(category: any): void
}


const VerificationQuestionCategorySelectModal: FunctionComponent<IProps> = (props: IProps) => {
  const classes = useStyles(blckTwttrTheme)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [selected, setSelected] = React.useState<any>()

  React.useEffect(() => {
    setIsOpen(props.open)
  }, [props.open])

  const selectCategory = (categoryToSelect: any) => {
    setSelected(categoryToSelect)
  }

  const [categories, setCategories] = React.useState<any[]>([])

  React.useEffect(() => {

    const categoriesArr = SanityVerificationQuestionCategoryEnumKeys.map((value, index) => {
      return SanityVerificationQuestionCategoryEnum[value]
    })

    console.log("the Categories are", categoriesArr)

    setCategories(categoriesArr)

  }, [])

  React.useEffect(() => {
    console.log("the selected category", selected)
    selected && props.handleSetCurrentCategory(selected)
  }, [selected])

  return (
    <Modal
      open={isOpen}
      style={{height: 'max-content', width: '200px', margin: 'auto'}}
    >
      <Grid
        container
        justifyContent='center'
        alignItems='center'
      >
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
                  >Category</Typography>
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
              {
                categories.map((category: SanityVerificationQuestionCategoryEnumType, index:number) => {
                  return <Grid key={index} container item>
                    {category && <Grid item>
                      <Button fullWidth onClick={() => selectCategory(category)} style={{fontFamily: 'Youth'}}>
                        <Grid container justifyContent='space-between'>
                          <Grid item>
                            {(category.value === props.currentCategory) ? <CheckBoxOutlined/>:<CheckBoxOutlineBlank/>}
                          </Grid>
                          <Grid item>
                            {category.displayName}
                          </Grid>
                        </Grid>
                      </Button>
                    </Grid>}
                  </Grid>
                })
              }
            </Grid>
          </Grid>
        </Grid>
        </Card>
      </Grid>
    </Modal>
  )
}

export default VerificationQuestionCategorySelectModal
