import React, { Component } from 'react'
import { Box, Card, CardHeader, CardBody, Image, Tag, Anchor, Text, Spinner } from 'grommet';
import _ from "lodash";

class ItemList extends Component {
  ItemPrice(props) {
    const lastPrice = props.prices[props.prices.length - 1]
    const lowest = _.minBy(props.prices, 'value')
    const color = lowest.value === lastPrice.value ? "#1b8b3f" : "#bc2848";
    return <Text color={color}>${lastPrice.value}</Text>
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
        { this.props.isLoading && <Spinner />}
        {
          this.props.items.map(item =>
            <Card key={item.name} height="auto" width="290px" background="light-1" margin="xsmall" pad="medium">
              <CardHeader height="65px">
                <Anchor href={`/item/${item.id}`} weight="normal" size="small">
                  {item.name}
                </Anchor>
              </CardHeader>
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

export default ItemList
