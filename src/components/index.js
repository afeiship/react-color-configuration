import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'noop';
import objectAssign from 'object-assign';

export default class extends Component {
  /*===properties start===*/
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: null,
    onChange: noop
  };
  /*===properties end===*/

  constructor(inProps) {
    super(inProps);
    this.state = {};
  }

  render() {
    const { className, ...props } = this.props;
    return (
      <div
        className={classNames('react-color-configuration', className)}
        {...props}>
        <p>
          <button className="icon-play">PLAY</button>
        </p>
        <p>Hello React!!</p>
      </div>
    );
  }
}
