import React from 'react';
import axios from 'axios';
import moment from 'moment';

const apiKey = process.env.REACT_APP_API_KEY;
const station = process.env.REACT_APP_WEATHER_STATION;
const apiUrl = process.env.REACT_APP_API_URL;

/*

TODO: Do more shopping around for APIs
TODO: Double-check values being returned as averages
TODO: Write a test for logic
TODO: Set color ranges
TODO: Connect color ranges and averages
TODO: Display it all in a way that doesn't suck
TODO: God, so many things. Database? Ability to cross off finished rows?

*/

class TemperatureData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      prop: "What's up",
      date: '',
      isLoading: true,
      tempData: [],
    };
  }

  componentDidMount(){
    this.getDailyWeatherData();
  }

  async getDailyWeatherData(){
    let startingDate = '20200101';
    let arr = [];
    for (let i = 0; i < 5; i++){
      let initialPlus = moment(startingDate).add(i, 'days');
      let date = initialPlus.format('YYYY-MM-DD');
      const url = `${apiUrl}?station=${station}&start=${date}&end=${date}&key=${apiKey}`;
      const data = await axios.get(url);
      let result = this.calculateAverageTemp(data.data.data[0]);
      let formattedDate = initialPlus.format('ll');
      let obj = {"date": formattedDate, "avg_temp": result};
      arr.push(obj);
    }
    this.setState({
      tempData: arr,
      isLoading: false
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

  renderData(){
    const { tempData } = this.state;
    for (let i = 0; i < 30; i++){
      return (
        tempData.map((item) => (
          <div>{item.date}: {item.avg_temp}</div>
        ))
      )
    }
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? (
      <div>Loading...</div>
    ) : (
    <div>{this.renderData()}</div>
    );
  }
}

export default TemperatureData;