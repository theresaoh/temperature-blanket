import React from 'react';
import axios from 'axios';
import moment from 'moment';

const apiKey = process.env.REACT_APP_API_KEY;
const station = process.env.REACT_APP_WEATHER_STATION;
const apiUrl = process.env.REACT_APP_API_URL;

/*

TODO: Double-check values being returned as averages
TODO: Write a test for logic
TODO: Display it all in a way that doesn't suck
TODO: God, so many things. Database? Ability to cross off finished rows?

*/

class TemperatureData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
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
    let endOfLoop = this.daysElapsedSinceStart(startingDate)
    // for (let i = 0; i < endOfLoop; i++){
    //   let initialPlus = moment(startingDate).add(i, 'days');
    //   let date = initialPlus.format('YYYY-MM-DD');
    //   const url = `${apiUrl}?station=${station}&start=${date}&end=${date}&key=${apiKey}`;
    //   const data = await axios.get(url);
    //   let result = this.calculateAverageTemp(data.data.data[0]);
    //   console.log(`${i} ${result}`);
    //   let color = this.determineColor(result);
    //   let formattedDate = initialPlus.format('ll');
    //   let obj = {"date": formattedDate, "avg_temp": result, "color": color};
    //   arr.push(obj);
    // }
    // this.setState({
    //   tempData: arr,
    //   isLoading: false
    // })
  }

  daysElapsedSinceStart(startingDate){
    var now = moment(new Date()); //todays date
    var end = moment(startingDate); // another date
    var duration = moment.duration(now.diff(end));
    var days = duration.asDays();
    let rounded = Math.floor(days);
    return rounded
  }

  calculateAverageTemp(data){
    // format from c to f first:
    const high = this.celsiusToFahrenheit(data.temperature_max);
    const low = this.celsiusToFahrenheit(data.temperature_min);
    // then get the average temperature for the day
    let total = high + low;
    let average = total / 2;
    return average.toFixed(2);
  }

  celsiusToFahrenheit(temp){
    return (temp * (9/5) + 32);
  }

  determineColor(temp){
    let color;
    switch (true) {
      case (temp <= 29.9):
        color = "Navy";
        break;
      case (temp > 29.9 && temp <= 34.5):
        color = "Colonial Blue";
        break;
      case (temp > 34.5 && temp <= 39.1):
        color = "Sky Blue";
        break;
      case (temp > 39.1 && temp <= 43.7):
        color = "Silver Blue";
        break;
      case (temp > 43.7 && temp <= 48.3):
        color = "Dusty Blue";
        break;
      case (temp > 48.3 && temp <= 52.9):
        color = "Peacock";
        break;
      case (temp > 52.9 && temp <= 57.5):
        color = "Olive";
        break;
      case (temp > 57.5 && temp <= 62.1):
        color = "Dusty Green";
        break;
      case (temp > 62.1 && temp <= 66.7):
        color = "Mustard";
        break;
      case (temp > 66.7 && temp <= 71.3):
        color = "Rust";
        break;
      case (temp > 71.3 && temp <= 75.9):
        color = "Terracotta";
        break;
      case (temp > 75.9):
        color = "Cranberry";
        break;
      default:
        color = "Couldn't calculate"
    }
    return color
  }

  renderData(){
    const { tempData } = this.state;
    return (
      <table>
        <thead>
          <tr>
            <th>
              Date
            </th>
            <th>
              Average Temp
            </th>
            <th>
              Corresponding Color
            </th>
          </tr>
        </thead>
      {tempData.map((item, index) => (
        <tbody key={index}>
          <tr>
            <td>
              {item.date}
            </td>
            <td>
              {item.avg_temp}
            </td>
            <td>
              {item.color}
            </td>
          </tr>
        </tbody>
      ))}
      </table>
    )
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