import React, { Component } from 'react'
import axios from 'axios';
import { Box, Card, CardHeader, CardBody, CardFooter, Button } from 'grommet';
import { Favorite, ShareOption } from 'grommet-icons';

const HOST = "http://localhost:8080";

class ItemDetails extends Component {
  state = {
    items: []
  }

  itemsUrl = `${HOST}/items`;

  componentDidMount() {
    axios.get(this.itemsUrl).then(res => {
      console.log(res);
      this.setState({ items: res.data });
    })
  }

  render() {
    return (
      <Box pad="medium" gap="medium" direction="row" wrap="true">
        {
          this.state.items.map(item =>
            <Card height="medium" width="300px" background="light-1" gap="medium" pad="medium">
              <CardHeader>{item.name}</CardHeader>
              <CardBody>${item.price}</CardBody>
              <CardFooter>
                <Button
                icon={<Favorite color="red" />}
                hoverIndicator
                />
                <Button icon={<ShareOption color="plain" />} hoverIndicator />
              </CardFooter>
            </Card>
          )
        }
      </Box>

    )
  }
}

export default ItemDetails
