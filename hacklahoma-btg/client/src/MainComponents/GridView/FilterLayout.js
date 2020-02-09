import React, { Component } from 'react'
import RatingExampleOnRate from './Star'
import { Button, Icon, Image, Item, Label, Grid} from 'semantic-ui-react'
import '../../App.css'

const paragraph = <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                      ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                      magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                      ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                      quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                      arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                      Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
                      dapibus.</p>


class FilterLayout extends Component {

  constructor(props){
    super(props)
    this.state ={
      items: {}
    }
  }

  loadProject = () =>{
    if(this.props.filters && this.props.filters.length > 0){
      this.loadProjectBasedOnFilter();
    }else{
      this.onLoad();
    }
  }

  onLoad = () =>{
    fetch('/api/GET/allReports')
    .then((res) => res.json())
    .then((data) => {
      try{
        this.setState({items: data}, function() { console.log("setState completed") })
      } catch (e){
        console.log(e);
      }
      
      return data;
    })
  }

  loadProjectBasedOnFilter = () =>{
    fetch('/api/GET/reportsWithFilters/'+this.props.filters)
    .then((res) => res.json())
    .then((data) => {
      try{
        this.setState({items: data}, function() { console.log("setState completed") })
      } catch (e){
        console.log(e);
      }
      
      return data;
    })
  }

  componentDidUpdate(prevProps){
    if (this.props.filters !== prevProps.filters) {
      this.loadProject();
    }
  }

  componentDidMount(){
    this.loadProject();
    
  }
  render(){

    return(
      
      <Grid stretched='true'>
    <Grid.Column  width={0}></Grid.Column>
    <Grid.Column width={10} textAlign='left'>
  <Item.Group divided>
      {Object.keys(this.state.items).map(key => {
        var item = this.state.items[key]
        return (<Item className='report-card'>
          <Item.Image onClick={()=> this.props.goToProject(item.pid)} src = {/*process.env.PUBLIC_URL + '/' +*/item.logo_url}/>
          <Item.Content >
            <Item.Header  onClick={()=> this.props.goToProject(item.pid)} textAlign='left' >{item.pname}</Item.Header>
            <Item.Extra className='fav-report' textAlign='left'>
                <RatingExampleOnRate/>
            </Item.Extra>
            <Item.Meta>
              <span className='cinema'>{item.main_cat}</span>
            </Item.Meta>
            <Item.Description onClick={()=> this.props.goToProject(item.pid)} >{item.short_desc}</Item.Description>
          </Item.Content>
        </Item>
      )})}
  </Item.Group>
  </Grid.Column>
  <Grid.Column  width={2}></Grid.Column>
  </Grid> 
    )
  }
}
  

export default FilterLayout
