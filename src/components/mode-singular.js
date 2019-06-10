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
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: [],
    onChange: noop
  };
  /*===properties end===*/

  constructor(inProps) {
    super(inProps);
    const { current } = inProps;
    this.state = {
      current,
      dirty: null
    };
  }

  change(inValue, inAction) {
    const { onChange } = this.props;
    const { dirty } = this.state;
    this.setState({ current: inValue }, () => {
      onChange({
        target: {
          dirty,
          value: [inValue],
          multiple: false,
          action: inAction
        }
      });
    });
  }

  _onProviderClick = (inItem) => {
    const { dirty, current } = this.state;
    const old = current;
    !dirty && (this.state.dirty = old) && this.setState({ dirty: old });
    this.change(inItem, 'click');
  };

  _onCancel = (e) => {
    const { dirty } = this.state;
    this.setState({ dirty: null });
    this.change(dirty, 'cancel');
  };

  _onOk = (e) => {
    const { current } = this.state;
    this.setState({ dirty: null });
    this.change(current, 'confirm');
  };

  render() {
    const { className, items, value, max, onModeChange, ...props } = this.props;
    const { current, dirty } = this.state;
    const CLASS_NAME = 'react-color-configuration';

    const displayed = (item) => {
      return current === item ? '✔' : null;
    };

    // console.log(' current:->', current);
    // console.log(' dirty:->', dirty);

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
            <span
              onClick={onModeChange}
              className="status--edit right mod--link">
              修改
            </span>
          </header>
          <div className="mod--bd">
            {value.map((item, index) => {
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
