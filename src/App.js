import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
    }

    setInterval(() => {
      const input = document.getElementById('myinput');
      const val = input.value;
      if(val !== '') {
        input.value = '';
        const tracks = val.split(' ');
        const newResults = this.state.results;
        newResults.push(tracks);
        this.setState({
          results: newResults,
        });
      }
    }, 1000);

    this.save = () => {
      const data = JSON.stringify(this.state.results);
      const blob = new Blob([data], {type: 'text/json'});
      const e = document.createEvent('MouseEvents');
      const a = document.createElement('a');
  
      a.download = 'results.json'
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    }
  }
  render() {
    return (
      <div className="App">
        <h1>{this.state.results.length}</h1>
        <input id="myinput" />
        <br />
        <button onClick={this.save}>Save</button>
      </div>
    );
  }
}

export default App;
