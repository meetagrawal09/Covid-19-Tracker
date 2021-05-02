
import React,{useState,useEffect} from 'react';

import './App.css';

import { FormControl,MenuItem,Select,Card,CardContent } from '@material-ui/core';


import InfoBox from './InfoBox';

import Map from './Map';

import Table from './Table';

import LineGraph from './LineGraph';

import {sortData} from './util';

function App() {

  //state is like a short term memory for react or how to write a variable in react
  //const[variable__name, function__name used for modifying] = useState("default__value")


  const [countries,setCountries] = useState([]);

  const [country,setCountry]= useState("worldwide");

  const [countryInfo,setCountryInfo]=useState({});

  const [tableData,setTableData] = useState([]);

  //API call to this url for data
  //https://disease.sh/v3​/covid-19​/countries

  //useEffect -> runs a piece of code based on a given condition

  //to initialise the data with the data for world-wide

  //we can have multiple useEffect functions


  useEffect(() => {
    const constGetWorldWideData = async()=>{
      await fetch("https://corona.lmao.ninja/v3/covid-19/all")
        .then ((response) => response.json())
        .then (data=>{

            //all the data from the response
            setCountryInfo(data);
        })

    }
    constGetWorldWideData();
  }, [])

  useEffect(() => {
    // effect
        
    //async -> send a request to a server, wait for it to respond and do something with the info
    //fire off the piece of code when the screen loads
    const getCountriesData = async() => {
      // wait for the fetch i.e await
      //when it comes back with the response what we do is put in the .then clause

      await fetch("https://corona.lmao.ninja/v3/covid-19/countries")
        .then ((response) => response.json())
      // restructuring the data we get back from the request
        .then((data)=>{

          // map loops throw the array -> it returns us the array in a special shape
          //here we are returning the object in special shape

          const countries= data.map((country)=>(
            {
              name: country.country,   //entire country name
              value: country.countryInfo.iso2,   //UK,US,FR etc
            }
          ))

          //changing the state of the countries array

          //we need to sort this data
          const sortedData=sortData(data);
          setTableData(sortedData);


          setCountries(countries);
      })
    }

    getCountriesData();

  }, []);
  //the square bracket here signifies the number of times it is called -> if empty then piece of code runs once when component loads
  // or we put a variable name and whenever the variable changes the function is executed



  //this listens to the change
  const onCountryChange = async (event) => {

    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode==='worldwide' ? "https://corona.lmao.ninja/v3/covid-19/all" : `https://corona.lmao.ninja/v3/covid-19/countries/${countryCode}`
    //if country code is worldwide it will have a different URL and if not it has a different URL
    //we use " ` " -> back-take to put in some javascript in the URL


    //make a call to the service
    // https://corona.lmao.ninja/v3/covid-19/countries/${country.value}

    //once we get the url we make a request to the URL

    await fetch(url)
    .then ((response) => response.json())
    .then (data=>{
        setCountry(countryCode);

        //all the data from the response
        setCountryInfo(data);
    })
  }

  return (
    <div className="app">
      <div className="app__left">
          <div className="app__header">

            <h1>COVID-19 TRACKER</h1>

            <FormControl className="app__dropdown">
              <Select variant="outlined" value={country} onChange={onCountryChange}> 
                  <MenuItem value="worldwide">WorldWide</MenuItem>
                  {/* curly braces allow us to write javascript in them */}
                  {
                    countries.map( (country) => (
                      <MenuItem value={country.value}>{country.name}</MenuItem>
                    ))
                  }
                  {/* loop throw all countries and show a drop down list of the options */}
                  {/* <MenuItem>option 1</MenuItem>
                  <MenuItem>option 2</MenuItem>
                  <MenuItem>option 3</MenuItem> */}
              </Select>
            </FormControl>
          </div>
          {/* https://corona.lmao.ninja/v3/covid-19/countries */}
          <div className="app__stats">
                {/* info boxes */}
                <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
                <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
                <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>

          </div>
          <Map/>
      </div>

      <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>

            <Table countries={tableData} />

            <h3>WorldWide new Cases</h3>

            <LineGraph/>

          </CardContent>
          
      </Card>
    </div>
  );
}

export default App;
