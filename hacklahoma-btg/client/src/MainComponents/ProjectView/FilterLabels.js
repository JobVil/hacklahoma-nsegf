import _ from 'lodash'
import React from 'react'
import { Label } from 'semantic-ui-react'


const colors = [
    'red',
    'green',
    'teal',
    'blue',
    'purple',
    'pink',
    'brown',
  ]

const FilterLaybels = (props) => {
  if(props.catigories){
    return (
      <div>
        {
          props.catigories.map((cat, i) =>
            <Label color={colors[i]} key={cat}>
              {_.capitalize(cat)}
            </Label>
          )
        }
      </div>
    );
  }else{
    return <div></div>
  }
}

export default FilterLaybels