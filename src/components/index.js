import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'noop';
import objectAssign from 'object-assign';
import CONST_COLORS from 'next-const-colors';

export default class extends Component {
  /*===properties start===*/
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.array,
    current: PropTypes.array,
    editing: PropTypes.bool,
    limit: PropTypes.number,
    onValidate: PropTypes.func,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: [],
    current: [],
    editing: true,
    limit: 8,
    onValidate: noop,
    onChange: noop
  };
  /*===properties end===*/

  constructor(inProps) {
    super(inProps);
    const { value } = inProps;
    this.state = { value, active: null };
  }

  componentWillReceiveProps() {
    console.log('next props receive.');
  }

  _onProviderClick = (inItem) => {
    const { value, active } = this.state;
    const { onValidate, limit } = this.props;
    const length = value.length;
    if (value.indexOf(inItem) > -1) {
      onValidate({ target: { value: 'DUPLICATE' } });
    } else {
      const activeIndex = value.indexOf(active);
      if (activeIndex === -1) {
        if (length < limit) {
          value.push(inItem);
          this.setState({ value });
        } else {
          onValidate({ target: { value: 'OVER_LIMIT' } });
        }
      } else {
        value[activeIndex] = inItem;
        this.setState({ value, active: inItem });
      }
    }
  };

  _onConsumerClick = (inItem) => {
    this.setState({ active: inItem });
  };

  _onDelete = (inItem) => {
    const { value } = this.state;
    const index = value.indexOf(inItem);
    value.splice(index, 1);
    this.setState({ value });
  };

  _onSelect = () => {
    this.setState({ active: null });
  };

  render() {
    const { className, items, value, limit, ...props } = this.props;
    const { active } = this.state;
    const CLASS_NAME = 'react-color-configuration';
    const _value = this.state.value;

    console.log('value_>', _value);
    return (
      <section className={classNames(CLASS_NAME, className)}>
        <div className={`clearfix ${CLASS_NAME}__provider`}>
          <div className="container">
            {CONST_COLORS.map((item, index) => {
              return (
                <div
                  onClick={this._onProviderClick.bind(this, item)}
                  className={`${CLASS_NAME}__item`}
                  key={index}
                  style={{ background: item }}>
                  {index}
                </div>
              );
            })}
          </div>
        </div>
        <div className={`${CLASS_NAME}__consumer`}>
          <header className={`${CLASS_NAME}__consumer-hd`}>
            <span className="left">默认配色顺序</span>
            <span className="right">完成</span>
          </header>
          <div className="container">
            {_value.map((item, index) => {
              return (
                <div key={index} className={`${CLASS_NAME}__consumer-item`}>
                  <div
                    onClick={this._onConsumerClick.bind(this, item)}
                    className={`${CLASS_NAME}__item`}
                    style={{ background: item }}>
                    {index + 1}
                  </div>
                  <div
                    className={`${CLASS_NAME}__action`}
                    onClick={this._onDelete.bind(this, item)}>
                    {active === item && (
                      <span className="action--select">
                        <img src={require('assets/images/icon-arrow.png')} />
                      </span>
                    )}
                    {active !== item && (
                      <span className="action--delete">
                        <img src={require('assets/images/icon-close.png')} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            <div
              hidden={_value.length === limit}
              className={`${CLASS_NAME}__consumer-item`}>
              <div
                className={`${CLASS_NAME}__item ${CLASS_NAME}__placeholder`}
                onClick={this._onConsumerClick.bind(this, null)}>
                {_value.length + 1}
              </div>
              {active === null && (
                <div
                  className={`${CLASS_NAME}__action`}
                  onClick={this._onSelect}>
                  <span className="action--select">
                    <img src={require('assets/images/icon-arrow.png')} />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
