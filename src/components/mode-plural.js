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
    min: PropTypes.number,
    max: PropTypes.number,
    onValidate: PropTypes.func,
    onModeChange: PropTypes.func,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: [],
    min: 1,
    max: 8,
    onValidate: noop,
    onModeChange: noop,
    onChange: noop
  };
  /*===properties end===*/

  constructor(inProps) {
    super(inProps);
    const { value } = inProps;
    const _value = value.length ? value : CONST_COLORS.slice(0, 1);
    this.state = {
      value: _value,
      active: _value[0],
      dirty: null
    };
  }

  componentWillReceiveProps(inNextProps) {
    const { value, multiple } = inNextProps;
    if (value !== this.state.value) {
      this.change(value);
    }
    if (multiple !== this.state.multiple) {
      this.setState({ multiple });
    }
  }

  change(inValue, inAction) {
    const { onChange } = this.props;
    const { value, dirty } = this.state;
    const target = { value: inValue };
    !dirty && this.setState({ dirty: value.slice(0) });
    this.setState(target, () => {
      target.action = inAction;
      onChange({ target });
    });
  }

  _onProviderClick = (inItem) => {
    const { value, active } = this.state;
    const { onValidate, max } = this.props;
    const length = value.length;
    const _value = value.slice(0);
    // dirty:

    if (value.indexOf(inItem) > -1) {
      onValidate({ target: { value: 'DUPLICATE' } });
    } else {
      const activeIndex = value.indexOf(active);
      if (activeIndex === -1) {
        if (length < max) {
          _value.push(inItem);
          this.change(_value, 'add');
        } else {
          onValidate({ target: { value: 'GT_MAX' } });
        }
      } else {
        _value[activeIndex] = inItem;
        this.setState({ active: inItem });
        this.change(_value, 'replace');
      }
    }
  };

  _onConsumerClick = (inItem) => {
    this.setState({ active: inItem });
  };

  _onDelete = (inItem) => {
    const { onValidate, min } = this.props;
    const { value } = this.state;
    const _value = value.slice(0);
    if (value.length > min) {
      const index = value.indexOf(inItem);
      _value.splice(index, 1);
      this.change(_value, 'remove');
    } else {
      onValidate({ target: { value: 'LT_MIN' } });
    }
  };

  _onSelect = () => {
    this.setState({ active: null });
  };

  _onCancel = (e) => {
    const { dirty } = this.state;
    this.setState({ dirty: null });
    this.change(dirty, 'cancel');
  };

  _onOk = (e) => {
    const { value } = this.state;
    this.setState({ dirty: null });
    this.change(value, 'confirm');
  };

  render() {
    const { className, items, value, max, onModeChange, ...props } = this.props;
    const { active, dirty } = this.state;
    const CLASS_NAME = 'react-color-configuration';
    const _value = this.state.value;
    const displayed = (item) => {
      const idx = _value.indexOf(item);
      return idx === -1 ? null : idx + 1;
    };

    return (
      <section
        className={classNames(CLASS_NAME, className)}
        data-multiple={'true'}>
        <div className={`clearfix ${CLASS_NAME}__provider`}>
          <header className="mod--hd">
            <span className="mod--label">颜色编辑</span>
          </header>
          <div className="mod--bd">
            {CONST_COLORS.map((item, index) => {
              return (
                <div
                  onClick={this._onProviderClick.bind(this, item)}
                  className={`${CLASS_NAME}__item`}
                  key={index}
                  data-color={item}
                  style={{ background: item }}>
                  {displayed(item)}
                </div>
              );
            })}
          </div>
        </div>
        <div className={`${CLASS_NAME}__consumer`}>
          <header className="mod--hd">
            <span className="left mod--label">默认配色顺序</span>
            {!dirty && (
              <span onClick={onModeChange} className="mod--link">
                完成
              </span>
            )}
            {dirty && (
              <div className="status--menu right">
                <span
                  onClick={this._onCancel}
                  className="mod--link action--cancel">
                  取消
                </span>
                <span onClick={this._onOk} className="mod--link action--ok">
                  确定
                </span>
              </div>
            )}
          </header>
          <div className="mod--bd">
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
              hidden={_value.length === max}
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
