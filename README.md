# react-color-configuration
> Color configuration panel for react.

## install
```shell
npm install -S afeiship/react-color-configuration
```

## options
> All used options.

| property     | type   | description              |
| ------------ | ------ | ------------------------ |
| className    | string | Extend className for css |
| value        | array  | Displayed current colors |
| current      | string | Current selected color   |
| min          | number | Min limit colors         |
| max          | number | Max limit colors         |
| onValidate   | func   | When warning             |
| onChange     | func   | Any change               |

## singular/plural mode
1. singular mode(multiple=false)

  | property  | type   | description              |
  | --------- | ------ | ------------------------ |
  | className | string | Extend className for css |
  | value     | array  | Displayed current colors |
  | current   | string | Current selected color   |
  | onChange  | func   | Any change               |


2. plural mode(multiple=true)
  
  | property   | type   | description              |
  | ---------- | ------ | ------------------------ |
  | className  | string | Extend className for css |
  | value      | array  | Displayed current colors |
  | min        | number | Min limit colors         |
  | max        | number | Max limit colors         |
  | onValidate | func   | When warning             |
  | onChange   | func   | Any change               |


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
