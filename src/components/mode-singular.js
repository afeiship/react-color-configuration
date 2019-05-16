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
    current: PropTypes.string,
    onModeChange: PropTypes.func,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: [],
    onModeChange: noop,
    onChange: noop
  };
  /*===properties end===*/

  constructor(inProps) {
    super(inProps);
    const { value, current } = inProps;
    const _value = value.length ? value : CONST_COLORS.slice(0, 1);
    this._staticValue = _value.slice(0);
    this.state = {
      value: [ current ],
      dirty: null
    };
  }

  componentWillReceiveProps(inNextProps) {
    const { value } = inNextProps;
    if (value !== this.state.value) {
      this.change(value);
    }
  }

  change(inValue, inAction) {
    const { onChange } = this.props;
    const target = { value: inValue };
    this.setState(target, () => {
      target.action = inAction;
      onChange({ target });
    });
  }

  _onProviderClick = (inItem) => {
    const { dirty, value } = this.state;
    const old = value.slice(0);
    value[0] = inItem;
    !dirty && this.setState({ dirty: old });
    this.change(value, 'click');
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

  _onEdit = () => {
    this.props.onModeChange();
  };

  render() {
    const { className, items, value, max, ...props } = this.props;
    const { dirty } = this.state;
    const CLASS_NAME = 'react-color-configuration';
    const _value = this.state.value;

    const displayed = (item) => {
      const idx = _value.indexOf(item);
      return idx === -1 ? null : '✔';
    };

    return (
      <section
        className={classNames(CLASS_NAME, className)}
        data-multiple="false">
        <div className={`${CLASS_NAME}__provider`}>
          <header className="mod--hd">
            <span className="mod--label">颜色编辑</span>
            {dirty && (
              <div className="right">
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
            {CONST_COLORS.map((item, index) => {
              return (
                <div
                  onClick={this._onProviderClick.bind(this, item)}
                  className={`${CLASS_NAME}__item`}
                  key={index}
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
            <span onClick={this._onEdit} className="status--edit right">
              修改
            </span>
          </header>
          <div className="mod--bd">
            {this._staticValue.map((item, index) => {
              return (
                <div key={index} className={`${CLASS_NAME}__consumer-item`}>
                  <div
                    className={`${CLASS_NAME}__item`}
                    style={{ background: item }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}
