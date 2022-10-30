import React, { Component } from 'react'
import { Col, ListGroup } from "react-bootstrap";
import axios from 'axios';
import { API_URL } from './utils/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUtensils,faCoffee,faCheese  } from "@fortawesome/free-solid-svg-icons";


const Icon = ({nama}) => {
  if(nama==="Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2"/>
  if(nama==="Minuman") return <FontAwesomeIcon icon={faCoffee} />
  if(nama==="Makanan") return <FontAwesomeIcon icon={faCheese} className="mr-2"/>

 return <FontAwesomeIcon icon={faUtensils} />
}

export default class ListCatagories extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       cataoris:[]
    }
  }

  componentDidMount (){
    axios
    .get(API_URL + "categories")
    .then(res => {
      
      const categories = res.data;
      this.setState({categories});
    })
    .catch ( error => {
      console.log("Error ya", error);
    })

    

  }

  render() {
    const {categories} = this.state;
    
   
    return (
      <Col md={2} mt="2">
        <h4><strong>Daftar Katagori</strong>
        </h4>
        <hr/>
        <ListGroup>
          {categories && categories.map((catagory) => (

            <ListGroup.Item key= {catagory.id}> 
            <h5>
            <Icon nama= {catagory.nama} />  {catagory.nama}
            </h5>

             </ListGroup.Item>
            


          ))}
          
     
    </ListGroup>
      </Col>
    )
  }
}

