import { Box, CardHeader, CardBody, Anchor, Image, DataChart } from 'grommet';
import React, { Component } from 'react';
import { withParams } from '../../utils/router';
import { format } from 'date-fns';

export class ItemDetails extends Component {
  constructor(props) {
    super(props)
    this.id = props.params.id;
  }

  DetailsInfo(props) {
    const item = props.item;
    const chartOptions = [
      { property: 'value', type: 'line', thickness: 'hair' },
      { property: 'value', type: 'point', point: 'circle', thickness: 'xsmall' }
    ];
    const data = item.prices.map((price) => {
      let result = price;
      if (price.promotions.length) {
        result.hasPromo = result.value;
        chartOptions.push({
          property: 'hasPromo', type: 'point', point: 'star', thickness: 'small'
        });
      }
      return result;
    });
    return (
      <Box pad="medium" gap="medium">
        <CardHeader>
          <Anchor href={item.link} target="_blank" weight="normal" size="small">
            {item.name}
          </Anchor>
        </CardHeader>
        <CardBody >
          <Box height="120px" margin={{vertical: "10px"}} align="start">
            <Image fit="contain" src={item.image}></Image>
          </Box>
          { item.prices.length > 1 ?
            <DataChart
              data={data}
              series={[
                { property: 'date', render: (value, datam, dataIndex) => {
                  return format(new Date(value), 'MMM d HH:mm');
                }},
                { label: 'price', property: 'value', prefix: '$'},
                { label: 'promotion', property: 'promotions', render: (value) => value.length > 0 ? value.join(', ') : null },
                { property: 'hasPromo', render: () => null }
              ]}
              chart={chartOptions}
              guide={{ y: { granularity: 'medium' }}}
              detail={true}
              legend={true}
            /> :
            <Box>Not Enough Data</Box>
          }
        </CardBody>
      </Box>
    )
  }

  render() {
    this.item = this.props.items.find((item) => item.id === this.id);
    return (
      this.item ? <this.DetailsInfo item={this.item} /> : null
    )
  }
}

export default withParams(ItemDetails);