'use strict';

import PropTypes from 'prop-types';

import React from 'react';

import { Row, Label, Control, Number as NumberInput, NumberRange } from './components';

export default class Number extends React.PureComponent {

  constructor(props) {
    super(props);

    this.prevY;

    this.state = {
      value: this.props.value
    }

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur(e) {
    console.log('blur');
    //TODO: this should also call 'onFinishChange' if the min and max are defined
  }

  handleDrag(e) {
    const diff = this.prevY - e.clientY;
    this.handleChange(this.state.value + diff * this.props.step);

    this.prevY = e.clientY;
  }

  handleMouseUp(e) {
    window.removeEventListener('mousemove', this.handleDrag);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown(e) {
    window.addEventListener('mousemove', this.handleDrag);
    window.addEventListener('mouseup', this.handleMouseUp);
    this.prevY = e.clientY;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      if (nextProps.value !== this.state.value) {
        this.setState({ value: nextProps.value });
      }
    }
  }

  render() {
    if (this.props.min !== undefined && this.props.max !== undefined) {
      return (
        <Row>
          <Label>{this.props.label}</Label>
          <Control>
            <NumberRange
              decimals={this.props.decimals}
              value={this.state.value}
              min={this.props.min}
              max={this.props.max}
              step={this.props.step}
              onChange={this.handleChange.bind(this)}
              onFinishChange={this.handleFinishChange.bind(this)}
            />
          </Control>
        </Row>
      )
    } else {
      return (
        <Row>
          <Label>{this.props.label}</Label>
          <Control>
            <NumberInput
              decimals={this.props.decimals}
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
              onFinishChange={this.handleFinishChange.bind(this)}
              width='100%'
              onMouseUp={(e) => this.handleMouseUp(e)}
              onMouseDown={(e) => this.handleMouseDown(e)}
              onBlur={(e) => this.handleBlur(e)}
            />
          </Control>
        </Row>
      )
    }
  }

  handleFinishChange(value) {
    this.setState({
      value: value
    });
    if (this.props.onFinishChange) {
      this.props.onFinishChange(value);
    }
  }

  handleChange(value) {
    this.setState({
      value: value
    })
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

}

Number.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onFinishChange: PropTypes.func,
};

Number.defaultProps = {
  value: 0,
};

Number.contextTypes = {
  style: PropTypes.object
};
