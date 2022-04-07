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
        {lastPrice.promotions?.length > 0 &&
          lastPrice.promotions.map(promo =>
            <Tag key={promo} value={promo} size="small" background="#1b8b3f" border={false}></Tag>
          )
        }
      </Box>
    )
  }

  ItemSummary(props) {
    const items = props.items;
    const scope = props.scope;
    return (
      <Box gap="medium" direction="row" wrap={true}>
        {
          items.map(item =>
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
                <scope.ItemPrice prices={item.prices} />
                <Text size="small">{ item.size }</Text>
                <scope.Promotions prices={item.prices} />
              </CardBody>
            </Card>
          )
        }
      </Box>
    )
  }

  render() {
    let groupedItems = [];
    if (this.props.items.length > 0) groupedItems = _.groupBy(this.props.items, 'category')
    return (
      <Box pad="medium" gap="medium">
        { this.props.isLoading && <Spinner />}
        { _.map(groupedItems, (items, category) => {
          return (
            <Box key={category}>
              <div>{category}</div>
              <this.ItemSummary items={items} scope={this} />
            </Box>
          )
        })}
      </Box>
    )
  }
}

export default ItemList
