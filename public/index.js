import ReactColorConfiguration from '../src/main';
import ReactDOM from 'react-dom';
import React from 'react';
import './assets/style.scss';

class App extends React.Component {
  _onValidate = (e) => {
    const { value } = e.target;
    console.log('msg:->', value);
  };

  _onChange = (e) => {
    console.log('onchange:->e', e.target.action, e.target.value);
  };

  render() {
    return (
      <div className="app-container">
        <ReactColorConfiguration
          onChange={this._onChange}
          onValidate={this._onValidate}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
