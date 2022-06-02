import React, {FunctionComponent} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {Grid, Typography} from '@material-ui/core'
import {SanityBrandQuoteItem} from '../cmsStaticPagesClient'
import BlockContentContainer from '../../BlockContentContainer'
import blckTwttrTheme from '../../common/Theme'

export const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    maxWidth: '210px',
    maxHeight: '100px'
  },
  title: {
    textAlign: 'center'
  },
}))

export type BrandQuotesProps = {
  title?: string
  quotes?: SanityBrandQuoteItem[]
}

const BrandQuotes: FunctionComponent<BrandQuotesProps> = (props) => {
  const classes = useStyles(blckTwttrTheme)

  return (
    <Grid container item direction="column" spacing={4}>
      <Grid item className={classes.title}>
        {props?.title && <BlockContentContainer body={props.title}/>}
      </Grid>
      <Grid item>
        <Grid container spacing={6}>
          {props?.quotes?.map((quoteItem) => <Grid item xs={12} md={6}>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <img src={quoteItem?.image?.asset?.url} className={classes.logo}/>
              </Grid>
              <Grid item><Typography variant="body1">{quoteItem?.description}</Typography></Grid>
            </Grid>
          </Grid>)}
        </Grid>
      </Grid>

    </Grid>
  )
}

export default BrandQuotes