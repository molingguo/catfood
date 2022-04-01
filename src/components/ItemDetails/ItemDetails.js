import React, { Component } from 'react'
import axios from 'axios';
import { Box, Card, CardHeader, CardBody, Image, Tag, Anchor, Text } from 'grommet';
import _ from "lodash";

const HOST = "http://localhost:8080";

class ItemDetails extends Component {
  state = {
    items: []
  }

  itemsUrl = `${HOST}/items`;

  componentDidMount() {
    axios.get(this.itemsUrl).then(res => {
      console.log(res);
      this.setState({ items: _.sortBy(res.data, ['name'])});
    })
  }

  ItemPrice(props) {
    const lastPrice = props.prices[props.prices.length - 1]
    return <Text color="#bc2848">${lastPrice.value}</Text>
  }

  Promotions(props) {
    const lastPrice = props.prices[props.prices.length - 1]
    return (
      <Box direction="row" margin={{vertical: "5px"}}>
        {lastPrice.promotions.length > 0 &&
          lastPrice.promotions.map(promo =>
            <Tag key={promo} value={promo} size="small" background="#1b8b3f" border={false}></Tag>
          )
        }
      </Box>
    )
  }

  render() {
    return (
      <Box pad="medium" gap="medium" direction="row" wrap={true}>
        {
          this.state.items.map(item =>
            <Card key={item.name} height="auto" width="290px" background="light-1" margin="xsmall" pad="medium">
              <CardHeader height="65px"><Text size="small">{item.name}</Text></CardHeader>
              <CardBody align="center">
                <Anchor href={item.link} target="_blank">
                  <Box height="120px" margin={{vertical: "10px"}}><Image fit="contain" src={item.image}></Image></Box>
                </Anchor>
                <this.ItemPrice prices={item.prices} />
                <Text size="small">{ item.size }</Text>
                <this.Promotions prices={item.prices} />
              </CardBody>
            </Card>
          )
        }
      </Box>

    )
  }
}

export default ItemDetails
