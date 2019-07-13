import React, { Component } from 'react'
import './style.css'

import Button from '../Button'
import Display from '../Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {
    
    state = { ...initialState }

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState });
    }

    setOperation(operation) {
        if(this.state.current === 0) {
            this.setState({
                current: 1,
                operation,
                clearDisplay: true
            })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(d) {

        if (d === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + d

        this.setState({ displayValue, clearDisplay: false})

        if(d !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }

    }

    render() {
        
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button size={3} op={false} label="AC" click={this.clearMemory} />
                <Button size={1} op={true} label="/" click={this.setOperation} />
                <Button size={1} op={false} label="7" click={this.addDigit} />
                <Button size={1} op={false} label="8" click={this.addDigit} />
                <Button size={1} op={false} label="9" click={this.addDigit} />
                <Button size={1} op={true} label="*" click={this.setOperation}/>
                <Button size={1} op={false} label="4" click={this.addDigit} />
                <Button size={1} op={false} label="5" click={this.addDigit} />
                <Button size={1} op={false} label="6" click={this.addDigit} />
                <Button size={1} op={true} label="-" click={this.setOperation}/>
                <Button size={1} op={false} label="1" click={this.addDigit} />
                <Button size={1} op={false} label="2" click={this.addDigit} />
                <Button size={1} op={false} label="3" click={this.addDigit} />
                <Button size={1} op={true} label="+" click={this.setOperation}/>
                <Button size={2} op={false} label="0" click={this.addDigit} />
                <Button size={1} op={false} label="." click={this.addDigit} />
                <Button size={1} op={true} label="=" click={this.setOperation} />
            </div>
        )
    }
}