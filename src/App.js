import React, { Component } from 'react';

import styles from './App.css';
import { Stock, AddStock } from './components/Stock.js';
import Graph from './components/Graph';

import colors from './highContrastRBGs';

import { connect } from 'react-redux';
import socket from './socket';

import { precisionRound } from './methods';
import { serverToClient, clientToServer } from './actions';

class App extends Component{
  componentDidMount(){
    socket.onmessage = (event) => {
      this.props.serverToClient(event.data);
    };
  }
  render(){
    const formatedStocks = this.props.stocks.map((stock, index) => {
      return{
        symbol : stock.symbol,
        color : "rgb(" + colors[index] + ")",
        lastUpdated : new Date(stock.lastUpdated),
        data : stock.data.map(record => {
          return{
            date : new Date(record.date),
            value : precisionRound(record.close, 2)
          };
        })
      };
    });
    return(
      <div>
        <div className={styles.title}>
          Nasdaq Charter
        </div>
        <div className={styles.subtitle}> 
          syncs between clients in real-time
        </div>
        {this.props.stocks.length > 0 && 
          <Graph 
            stocks={formatedStocks}
          />
        }
        <div className={styles.app}>
          {formatedStocks.map((stock, index) => {
            return(
              <Stock
                key={index}
                stock={stock}
                updateSymbolCb={() => this.props.clientToServer({
                  type : "ADD",
                  payload : stock.symbol
                })}
                removeSymbolCb={() => this.props.clientToServer({
                  type : "REMOVE",
                  payload : stock.symbol
                })}
              /> 
            )
          })}
          <AddStock
            addSymbolCb={(symbol) => this.props.clientToServer({
              type : "ADD",
              payload : symbol
            })}
          />
        </div>
        <div className={styles.poweredBy}>
          <a href="https://www.alphavantage.co/">
            Powered By Alpha Vantage
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    stocks : state.stocks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clientToServer : (data) => {
      dispatch(clientToServer(data));
    },
    serverToClient : (data) => {
      dispatch(serverToClient(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);