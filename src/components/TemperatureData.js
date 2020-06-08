import React from 'react';
import axios from 'axios';
import moment from 'moment';

const apiKey = process.env.REACT_APP_API_KEY;
const station = process.env.REACT_APP_WEATHER_STATION;
const apiUrl = process.env.REACT_APP_API_URL;

class TemperatureData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      prop: "What's up",
      date: '',
    };
  }

  componentDidMount(){
    let dateToday = moment().subtract(2, 'days').format('YYYY-MM-DD');
    this.setState({
      date: dateToday
    }, this.getDailyWeatherData)
  }

  getDailyWeatherData(){
    const url = `${apiUrl}?station=${station}&start=${this.state.date}&end=${this.state.date}&key=${apiKey}`;
    axios.get(url)
      .then((res) => {
        this.calculateAverageTemp(res.data.data[0]);
      })
  }

  calculateAverageTemp(data){
    // format from c to f first:
    const high = this.celsiusToFahrenheit(data.temperature_max);
    const low = this.celsiusToFahrenheit(data.temperature_min);
    // then get the average temperature for the day
    let total = high + low;
    let average = total / 2;
    return average;
  }

  celsiusToFahrenheit(temp){
    return (temp * (9/5) + 32);
  }

  render() {
    return (
    <div>{this.state.prop}, I'm where the temperature data goes.</div>
    );
  }
}

export default TemperatureData;