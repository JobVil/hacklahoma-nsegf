import React, { Component } from 'react'
import { Button, Comment, Form, Header, Grid, GridColumn } from 'semantic-ui-react'

class  ProjectComments extends Component {

  constructor(props){
    super(props)
    this.state ={
      ProjectComments: {},
      activeComment:''
    }
  }
  
  
  handleSubmit = (e) => {
    e.preventDefault();
}

handleChange = (e) => {
    this.setState({
      activeComment: e
    });
}



  onLoad = () =>{
    fetch('/api/GET/singleReportComments/'+this.props.pagePid)
    .then((res) => res.json())
    .then((data) => {
      try{
        this.setState({ProjectComments: data}, function() { console.log("setState completed") })
      } catch (e){
        console.log(e);
      }
      
      return data;
    })
  }

  componentDidMount(){
    this.onLoad();
  }

  render(){
    return (
      <Grid>
    <GridColumn width={1}></GridColumn>
    <GridColumn width={10} textAlign='left'>
    <Comment.Group>
      <Header as='h3' dividing textAlign='center'>
        Comments
      </Header>

      {Object.keys(this.state.ProjectComments).map(key =>{
        var comment = this.state.ProjectComments[key];

        return(
        <Comment>
          <Comment.Avatar src={comment.user_url}/>
          <Comment.Content>
            <Comment.Author >{comment.userName}</Comment.Author>
            <Comment.Metadata>
              <div>{comment.dateCreated}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.commentText}</Comment.Text>
          </Comment.Content>
        </Comment>)
      })}

      <Form reply>
        <Form.TextArea onSubmit={this.handleSubmit}  onChange={this.handleChange}/>
        <Button  onClick={this.handleSubmit} content='Add Reply' labelPosition='left' icon='edit' type="submit" primary />
      </Form>
    </Comment.Group>
  </GridColumn>
  <GridColumn width={1}></GridColumn>
  </Grid>
    );
  }
  
}

export default ProjectComments