import React from 'react';
import classNames from 'classnames';

import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

export default function Stats({deck, stats, currentIndex}) {
  return <Paper
            className="stats"
            zDepth={1}
         >
          {
            deck.cards.map((card, index) => {
              const isImage = card.q.endsWith('jpg') || card.q.endsWith('png');
              let style = {};
              if (isImage) {
                style = {
                  backgroundImage: `url(${card.q})`,
                  backgroundSize: 'cover',
                  width: '80px'
                }
              }

              return <Chip
                        className={classNames(
                            'chip',
                            {'chip--selected': index === currentIndex}
                        )}
                        style={style}
                        key={index}
                      >
                        <Avatar
                          style={{fontSize: '10px'}}
                        >
                          0%
                        </Avatar>
                        {
                          !isImage
                          ? (
                            <span title={card.a}>
                              {card.q}
                            </span>
                          )
                          : null
                        }
                    </Chip>
            })
          }
        </Paper>
}
