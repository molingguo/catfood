import { Box, Grommet, Anchor } from 'grommet';
import './App.css';
import { Routes, Route } from "react-router-dom";
import ItemList from './components/ItemList/ItemList';
import axios from 'axios';
import ItemDetails from './components/ItemDetails/ItemDetails';
import _ from "lodash";
import React from 'react'

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

// const HOST = "http://localhost:8080";
// const HOST = "http://catfood-server-dev.us-east-1.elasticbeanstalk.com";
const HOST = "https://catfoodserver.molingguo.com/";
const itemsUrl = `${HOST}/items`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], isLoading: true }
  }

  componentDidMount() {
    axios.get(itemsUrl).then(res => {
      console.log(res);
      this.setState({ items: _.sortBy(res.data, ['name']), isLoading: false });
    })
  }

  render() {
    return (
      <Grommet theme={theme}>
        <AppBar>
          <Anchor href="/" color="white" weight="normal">Ricecake & Zorro</Anchor>
        </AppBar>
        <Routes>
          <Route path="/" element={<ItemList items={this.state.items} isLoading={this.state.isLoading} />} />
          <Route path="/item/:id" element={<ItemDetails items={this.state.items} />} />
        </Routes>
      </Grommet>
    )
  }
}

export default App;
