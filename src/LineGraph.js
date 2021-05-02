import React,{useState , useEffect} from 'react'

import {Line} from 'react-chartjs-2';

import numeral from "numeral";

function LineGraph() {

    const [data,setData] = useState({});

    // https://corona.lmao.ninja/v3/covid-19/historical/all?lastdays=120

    const options = {
        legend : {
            display : false,
        },
        elements: {
            points :{
                radius: 0,
            },
        },

        maintainAspectRatio: false,
        tooltips: {
            mode :"index",
            intersect: false,
            callbacks: {
                label : function(tooltipItem,data){
                    return numeral(tooltipItem.value).format("+0,0");
                },
            },
        },

        scales :{
            xAxes:[
                {
                    type: "time",
                    time: {
                        format: "MM/DD/YY",
                        tooltipFormat:"ll",
                    },
                },
            ],
            yAxes: [
                {
                    gridLines:{
                        display: false,
                    },
                    ticks: {
                        callback: function(value, index, values){
                            return numeral(value).format("0a");
                        },
                    },
                },
            ]
        }
    }


    //function which is transforming the data to what we need for chart-js

    const buildChartData = (data) =>{
        const chartData=[];
        let lastDataPoint;
        for (let date in data.cases) {
            if(lastDataPoint){
                const newDataPoint = {
                    x: date,
                    y: data['cases'][date] - lastDataPoint
                    // we are trying to get the new case by subtracting the previous day cases
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data['cases'][date];
        }

        return chartData;
    }


    useEffect(() => {
    const constGetData = async()=>{
      await fetch("https://corona.lmao.ninja/v3/covid-19/historical/all?lastdays=120")
        .then ((response) => response.json())

        // the data returned is not like that which we can pass to LineGraph

        .then (data=>{

            //all the data from the response
            const chartData = buildChartData(data);
            setData(chartData);
        })

        
    }
    constGetData();
  }, [])


    return (
        <div>

            {/*data is to be of the format->   data: [{x: 10, y: 20}, {x: 15, y: null}, {x: 20, y: 10}] */}
            {/* check if data exists or not */}
            {data?.length > 0 && (
                <Line
                options={options}

                data = {{
                    datasets : [{
                        backgroundColor: "rgba(204, 16, 52, 0.5)",

                        borderColor: "#CC1034",
                        data: data,
                    }]
                }}
                />
            )}
        </div>
    )
}

export default LineGraph
