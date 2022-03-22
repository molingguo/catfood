import React, { Component } from 'react'
import styles from './ItemDetails.module.scss';
import axios from 'axios';

class ItemDetails extends Component {
  itemUrl = 'https://www.chewy.com/american-journey-pate-poultry-seafood/dp/160934';

  componentDidMount() {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/html',
    };
    axios({
      method: 'get',
      url: this.itemUrl,
      headers: headers
    }).then(res => {
      console.log(res);
    })
  }

  render() {
    return (
      <div className={styles.ItemDetails} data-testid="ItemDetails">
        ItemDetails Component
      </div>
    )
  }
}

export default ItemDetails
