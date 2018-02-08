import React, { Component } from 'react';
import {VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer} from 'victory';
import styles from './Graph.css';

import { easyReadDate } from '../methods';

const Graph = (props) => {
  return(
    <div className={styles.container}>
      <VictoryChart
        containerComponent={<VictoryVoronoiContainer/>}
        height={150}
        padding={{top: 5, bottom: 20, left: 20, right: 20}}
        theme={VictoryTheme.material}
        scale={{x : "time"}}
      >
        <VictoryAxis
          style={{
            axis: {stroke: "black"},
            grid: {stroke: 'grey'},
            ticks: {stroke: "black", size: 2.5},
            tickLabels: {fontSize: 8, fill : "black", padding: 2.5}
          }}
        />
        <VictoryAxis 
          dependentAxis
          style={{
            axis: {stroke: "black"},
            grid: {stroke: 'grey'},
            ticks: {stroke: "black", size: 2.5},
            tickLabels: {fontSize: 6, fill : 'black', padding: 2.5}
          }}
        />
        {props.stocks.map((stock, index) => {
          return(
            <VictoryLine
              labelComponent={
                <VictoryTooltip
                  flyoutStyle={{
                    fill: "white", strokeWidth : 0.25,
                  }}
                  style={{fontSize : 4, padding : 1.5}}
                  pointerWidth={2}
                  pointerLength={2}
                  dy={-6.5}
                />
              }
              key={index}
              labels={
                (d) => {
                return(
                  stock.symbol + "\n"
                  + d.y + "\n" 
                  + easyReadDate(d.x)
                ) 
              }}
              data={stock.data}
              x="date"
              y="value"
              style={{
                data : {
                  stroke : stock.color,
                  strokeWidth: 1
                },
                labels: { fill: stock.color }
              }}
            />
          );
        })}
      </VictoryChart>
    </div>
  );
};

export default Graph;