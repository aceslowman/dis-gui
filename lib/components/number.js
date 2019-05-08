'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('./components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Number = function (_React$PureComponent) {
  _inherits(Number, _React$PureComponent);

  function Number(props) {
    _classCallCheck(this, Number);

    var _this = _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).call(this, props));

    _this.prevY;

    _this.state = {
      value: _this.props.value
    };

    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handleDrag = _this.handleDrag.bind(_this);
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    return _this;
  }

  _createClass(Number, [{
    key: 'handleBlur',
    value: function handleBlur(e) {
      console.log('blur');
      //TODO: this should also call 'onFinishChange' if the min and max are defined
    }
  }, {
    key: 'handleDrag',
    value: function handleDrag(e) {
      var diff = this.prevY - e.clientY;
      this.handleChange(this.state.value + diff * this.props.step);

      this.prevY = e.clientY;
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(e) {
      window.removeEventListener('mousemove', this.handleDrag);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      window.addEventListener('mousemove', this.handleDrag);
      window.addEventListener('mouseup', this.handleMouseUp);
      this.prevY = e.clientY;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        if (nextProps.value !== this.state.value) {
          this.setState({ value: nextProps.value });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.props.min !== undefined && this.props.max !== undefined) {
        return _react2.default.createElement(
          _components.Row,
          null,
          _react2.default.createElement(
            _components.Label,
            null,
            this.props.label
          ),
          _react2.default.createElement(
            _components.Control,
            null,
            _react2.default.createElement(_components.NumberRange, {
              decimals: this.props.decimals,
              value: this.state.value,
              min: this.props.min,
              max: this.props.max,
              step: this.props.step,
              onChange: this.handleChange.bind(this),
              onFinishChange: this.handleFinishChange.bind(this)
            })
          )
        );
      } else {
        return _react2.default.createElement(
          _components.Row,
          null,
          _react2.default.createElement(
            _components.Label,
            null,
            this.props.label
          ),
          _react2.default.createElement(
            _components.Control,
            null,
            _react2.default.createElement(_components.Number, {
              decimals: this.props.decimals,
              value: this.state.value,
              onChange: this.handleChange.bind(this),
              onFinishChange: this.handleFinishChange.bind(this),
              width: '100%',
              onMouseUp: function onMouseUp(e) {
                return _this2.handleMouseUp(e);
              },
              onMouseDown: function onMouseDown(e) {
                return _this2.handleMouseDown(e);
              },
              onBlur: function onBlur(e) {
                return _this2.handleBlur(e);
              }
            })
          )
        );
      }
    }
  }, {
    key: 'handleFinishChange',
    value: function handleFinishChange(value) {
      this.setState({
        value: value
      });
      if (this.props.onFinishChange) {
        this.props.onFinishChange(value);
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(value) {
      this.setState({
        value: value
      });
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
  }]);

  return Number;
}(_react2.default.PureComponent);

exports.default = Number;


Number.propTypes = {
  value: _propTypes2.default.number,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  step: _propTypes2.default.number,
  label: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onFinishChange: _propTypes2.default.func
};

Number.defaultProps = {
  value: 0
};

Number.contextTypes = {
  style: _propTypes2.default.object
};