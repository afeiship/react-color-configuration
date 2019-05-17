import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'noop';
import objectAssign from 'object-assign';
import CONST_COLORS from 'next-const-colors';
import ModeSingular from './mode-singular';
import ModePlural from './mode-plural';

export default class extends Component {
  /*===properties start===*/
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.array,
    multiple: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    onValidate: PropTypes.func,
    onModeChange: PropTypes.func,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: [],
    multiple: false,
    min: 1,
    max: 8,
    onValidate: noop,
    onModeChange: noop,
    onChange: noop
  };
  /*===properties end===*/

  constructor(inProps) {
    super(inProps);
    const { multiple } = inProps;
    this.state = {
      multiple
    };
  }

  // componentWillReceiveProps(inNextProps) {
  //   const { multiple } = inNextProps;
  //   if (multiple !== this.state.multiple) {
  //     this.modeChange(multiple);
  //   }
  // }

  modeChange(inValue) {
    const { onModeChange } = this.props;
    const target = { multiple: inValue };
    this.setState(target, () => {
      onModeChange({ target });
    });
  }

  _onModeChange = (inValue) => {
    this.modeChange(inValue);
  };

  render() {
    const { multiple } = this.state;
    const { onModeChange, ...props } = this.props;
    return multiple ? (
      <ModePlural
        onModeChange={this._onModeChange.bind(this, false)}
        {...props}
      />
    ) : (
      <ModeSingular
        onModeChange={this._onModeChange.bind(this, true)}
        {...props}
      />
    );
  }
}
