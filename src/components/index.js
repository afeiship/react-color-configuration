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
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: [],
    multiple: false,
    min: 1,
    max: 8,
    onValidate: noop,
    onChange: noop
  };
  /*===properties end===*/

  constructor(inProps) {
    super(inProps);
    const { value, multiple } = inProps;
    this.state = {
      multiple
    };
  }

  _onModeChange = (inValue) => {
    this.setState({ multiple: inValue });
  };

  render() {
    const { multiple } = this.state;
    return multiple ? (
      <ModePlural {...this.props} />
    ) : (
      <ModeSingular
        onModeChange={this._onModeChange.bind(this, true)}
        {...this.props}
      />
    );
  }
}
