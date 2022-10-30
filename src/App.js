import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, ListCatagories, NavbarComponents, Menus } from "./components";
import { API_URL } from "./components/utils/constants";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      categoriYangDipilih: 'Minuman',
    };
  }

  componentDidMount() {
    axios
      .get(API_URL+"products?category.nama=="+this.state.categoriYangDipilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Error ya", error);
      });
  }

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: [],
    });
  };

  render() {
    const { menus } = this.state;
    return (
      <div className="App">
        <NavbarComponents />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCatagories />
              <Col>
                <h4>
                  <strong>Daftar Prodak</strong>
                </h4>
                <hr />
                <Row>
                  {menus &&
                    menus.map((menu) => <Menus key={menu.id} menu={menu} />)}
                </Row>
              </Col>
              <Hasil />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
