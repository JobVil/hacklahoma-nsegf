import _ from 'lodash'
import React from 'react'
import { Label } from 'semantic-ui-react'

const types = [
  'WebBased',
  'C#',
  'Asp.Net',
  'Seblime',
  'Beginner',
  'Full',
  'Azure',
]

const colors = [
    'red',
    'green',
    'teal',
    'blue',
    'purple',
    'pink',
    'brown',
  ]

const FilterLaybels = () => (
  <div>
    {types.map((type, i) => (
      <Label color={colors[i]} key={type}>
        {_.capitalize(type)}
      </Label>
    ))}
  </div>
)

export default FilterLaybels