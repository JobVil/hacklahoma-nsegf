import React from 'react'
import { Icon, Label } from 'semantic-ui-react'

const SearchedTags = (props) => {
    let labels = [];
    props.filters.forEach(filter => {
        labels.push( 
                <Label color='orange'>
                    {filter}
                    <Icon name='delete' onClick = {() => props.removeFilter(filter)}/>
                </Label>)
    });
    return(
  <div>
      {labels.map( label => label)
      }
  </div>
)
}

export default SearchedTags
