import React from 'react';
// import Axios from 'axios';


class TemperatureData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      prop: "What's up",
    };
  }

  render() {
    return (
    <div>{this.state.prop}, I'm where the temperature data goes.</div>
    );
  }
}

export default TemperatureData;