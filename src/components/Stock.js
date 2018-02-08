import React, { Component } from 'react';

import styles from './Stock.css';
import propTypes from 'prop-types';
import { isAlpha, easyReadDate } from '../methods';

export class Stock extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const isUpdatedToday = 
      easyReadDate(new Date()) === easyReadDate(this.props.stock.lastUpdated);
    return(
      <div className={styles.stock}>
        <div className={styles.flexSplit}>
          <div
            className={styles.item}
            style={{color : this.props.stock.color}}
          >
            {this.props.stock.symbol}
          </div>
          <div
            className={styles.item}
          > 
            {this.props.stock.data[0].value}
          </div>
        </div>
        {!isUpdatedToday && 
          <div className={styles.updated}>
            {"Last Updated: " + easyReadDate(this.props.stock.lastUpdated)}
          </div>
        }
        <div className={styles.flexSplit}>
          {!isUpdatedToday &&
            <div 
              className={styles.item}
              style={{lineHeight : "0"}}
            >
              <button
                onClick={() => this.props.updateSymbolCb()}
              >
                Update
              </button>
            </div>
          }
          <div 
            className={styles.item}
            style={{lineHeight : "0"}}
          >
            <button
              onClick={() => this.props.removeSymbolCb()}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export class AddStock extends Component{
  constructor(props){
    super(props);
    this.state = {
      symbolInput : ""
    };
  }
  handleField(event){
    let value = event.target.value;
    if(isAlpha(value) && value.length <= 5){
      this.setState({symbolInput : value.toUpperCase()});
    }
  }
  handleClick(event){
    event.preventDefault();
    this.props.addSymbolCb(this.state.symbolInput);
    this.setState({
      symbolInput : ""
    });
  }
  render(){
   return(
      <div> 
        <div className={styles.stock}>
          <input
            className={styles.input}
            value={this.state.symbolInput}
            placeholder="Symbol"
            type='text'
            onChange={(event) => this.handleField(event)}
          />
          <br />
          <button
            disabled={this.state.symbolInput ? false : true}
            onClick={(event) => this.handleClick(event)}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

AddStock.propTypes = {
  addSymbolCb : propTypes.func.isRequired,
};