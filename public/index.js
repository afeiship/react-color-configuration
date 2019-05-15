import ReactColorConfiguration from '../src/main';
import ReactDOM from 'react-dom';
import React from 'react';
import './assets/style.scss';

class App extends React.Component {
  _onValidate = (e) => {
    const { value } = e.target;
    console.log('msg:->', value);
  };
  render() {
    return (
      <div className="app-container">
        <ReactColorConfiguration onValidate={this._onValidate} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
