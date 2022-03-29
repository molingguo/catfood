import React, { Component } from 'react'
import axios from 'axios';
import { Box, Card, CardHeader, CardBody, CardFooter, Button, Image, Tag } from 'grommet';
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
            <Card height="auto" width="300px" background="light-1" gap="medium" pad="medium">
              <CardHeader height="80px">{item.name}</CardHeader>
              <CardBody align="center">
                <Box height="180px"><Image fit="contain" src={item.image}></Image></Box>
                <span>${item.price}</span>
                <span>{ item.size }</span>
                <Box direction="row">
                  {
                    item.promotions.length > 0 ? item.promotions.map(promo =>
                      <Tag value={promo} size="small" background="#1b8b3f" border="false"></Tag>
                    ) : <span></span>
                  }
                </Box>
              </CardBody>
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
