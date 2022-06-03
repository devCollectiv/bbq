import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Button, Card, Modal, Typography } from '@material-ui/core'
import { CheckBoxOutlineBlank, CheckBoxOutlined, Close } from '@material-ui/icons'
import blckTwttrTheme from '../../../../theme/Theme'
import { SanityVerificationQuestionCategoryEnumType } from '../../../../../utils/Types'
import cmsService from '../../../../shared/cms/cmsService'
import SanityVerificationCategory from '../../../../shared/enum/SanityVerificationCategory'


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
  currentDifficulty: number
  handleSetCurrentCategory(category: any): void
}


const VerificationQuestionCategorySelectModal: FunctionComponent<IProps> = (props: IProps) => {
  const classes = useStyles(blckTwttrTheme)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [selected, setSelected] = React.useState<any>()
  const [categoryCountsForThisDifficulty,setCategoryCountsForThisDifficulty] = React.useState<any>()

  React.useEffect(() => {
    setIsOpen(props.open)
  }, [props.open])

  const selectCategory = (categoryToSelect: any) => {
    setSelected(categoryToSelect)
  }

  const [categories, setCategories] = React.useState<any[]>([])

  React.useEffect(() => {
    const categoriesArr = SanityVerificationCategory.enumKeysArr.map((categoryKey) => {
      // @ts-ignore
      return SanityVerificationCategory.objectsByEnum[SanityVerificationCategory.enum[categoryKey]]
    })

    cmsService.getCategoryCountsByDifficulty().then((categoryCountsArr)=>{
      // cms get category counts
      setCategoryCountsForThisDifficulty(categoryCountsArr[props.currentDifficulty])
      setCategories(categoriesArr)
    })
  }, [])

  React.useEffect(() => {
    selected && props.handleSetCurrentCategory(selected)
  }, [selected])

  return (
    <Modal
      open={isOpen}
      style={{height: 'max-content', width: '320px', margin: 'auto'}}
    >
      <Grid
        container
        justifyContent='center'
        alignItems='center'
      >
        <Card
          style={{backgroundColor: blckTwttrTheme.palette.background.default, borderRadius: "16px", padding: blckTwttrTheme.spacing(3, 3)}}
        >
          <Grid container direction='column' item spacing={1}>
            <Grid container item>
              <Grid container item style={{
                padding: blckTwttrTheme.spacing(2.5)
              }} alignItems='stretch' justifyContent='space-between'>
                <Grid container item xs={10}>
                  <Grid container item>
                    <Typography
                      style={{fontFamily: 'Youth'}}
                      variant='h6'
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
              <Grid container item>
                {
                  categories.map((category: SanityVerificationQuestionCategoryEnumType, index: number) => {
                    return <Grid key={index} container item>
                      {categoryCountsForThisDifficulty[index] !== 0 && category && <Grid container item>
                        <Button fullWidth onClick={() => selectCategory(category)} style={{fontFamily: 'Youth'}}>
                          <Grid container justifyContent='space-between' alignItems='flex-start' spacing={2}>
                            <Grid item container xs={1}>
                              {(category.value === props.currentCategory) ? <CheckBoxOutlined/> :
                                <CheckBoxOutlineBlank/>}
                            </Grid>
                            <Grid item container xs={10}>
                              <Typography>
                              {category.displayName}
                              </Typography>
                            </Grid>
                            <Grid item container xs={1}>
                              <Typography color='secondary' variant='subtitle1'>
                              {categoryCountsForThisDifficulty[index]}
                              </Typography>
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
