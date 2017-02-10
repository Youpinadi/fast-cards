import React from 'react'
import Paper from 'material-ui/Paper'
import classNames from 'classnames'

function Card({value, status}) {
  let style = {}
  if (value.endsWith('jpg') || value.endsWith('png')) {
    style = {
      backgroundImage: `url(${value})`,
      backgroundSize: 'cover',
      height: '30vh',
      color: 'transparent'
    }
  }

  return <Paper
            className={classNames('card', `card--${status}`)}
            style={style}
            zDepth={1}
         >
          {value}
        </Paper>
}

export default Card;
