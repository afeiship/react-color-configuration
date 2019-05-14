# react-color-configuration
> Color configuration panel for react.

## install
```shell
npm install -S afeiship/react-color-configuration
```

## usage
1. import css
  ```scss
  @import "~react-color-configuration/style.scss";

  // customize your styles:
  $react-color-configuration-options: ()
  ```
2. import js
  ```js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import ReactColorConfiguration from 'react-color-configuration';
  
  // your app:
  class App extends React.Component{
    render(){
      return (
        <ReactColorConfiguration />
      )
    }
  }

  // render to dom:
  ReactDOM.render(<App/>, document.getElementById('app'));
  ```

## documentation
- https://afeiship.github.io/react-color-configuration/
