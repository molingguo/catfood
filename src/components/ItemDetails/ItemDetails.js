import React, { Component } from 'react'
import styles from './ItemDetails.module.scss';
import axios from 'axios';

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
      <div className={styles.ItemDetails} data-testid="ItemDetails">
        <ul>
          {
            this.state.items.map(item =>
            <li key={item.id}>
              <div>{item.name}</div>
              <div>{item.price}</div>
            </li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default ItemDetails
