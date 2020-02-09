import React, { Component } from 'react'
import { Rating } from 'semantic-ui-react'

export default class RatingExampleOnRate extends Component {
  state = {}

  handleRate = (e, { rating, maxRating }) =>
    this.setState({ rating, maxRating })

  render() {
    return (
      <div>
        <Rating icon='star' size='huge' maxRating={1} onRate={this.handleRate} />
      </div>
    )
  }
}
