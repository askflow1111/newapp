import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';
import Navigation from '../navigation/index'

class Wizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepsIndex: 0,
            wizardContext: props.wizardContext,
        }
    }

    changeCurrentStep = async (action) => {
        if (action === 3) {
            this.props.onComplete(this.state.wizardContext);
        } else {
            let newStepsIndex = null;
            if (action === 1) {
                newStepsIndex = -1;
            } else if (action === 2) {
                newStepsIndex = 1;
            }

            await this.setState({
                stepsIndex: this.state.stepsIndex + newStepsIndex,
            })
        }
    }

    onAction = async (event) => {
        let value = event.target.value;
        let wizardContextKey = this.props.steps[this.state.stepsIndex].props.wizardContextKey;
        let key = this.state.wizardContext[wizardContextKey];
        let isValueObj = typeof key === 'object' && key !== null;
        if (!isValueObj) {
            let newValue = Object.values(value)[0];
            value = (isNaN(newValue) ? value : Number(value));
        } else {
            value = {
                ...this.state.wizardContext[wizardContextKey],
                [event.target.name]: value,
            }
        }

        await this.setState(prevState => ({
            wizardContext: {
                ...this.state.wizardContext,
                [wizardContextKey]: value,
            }
        }))        
    }

    render() {
        const { stepsIndex, wizardContext } = this.state;
        const { hideProgressBar, header, steps } = this.props;
        let currentStep = steps[stepsIndex]
        let progressBarValue = Math.round((stepsIndex / steps.length) * 100);
        return (
            <div className="wizardContainer">
                <div className="wizard">
                    <header>{header()}</header>
                    {hideProgressBar ? null : (<ProgressBar now={progressBarValue} label={`${progressBarValue}%`} />)}

                    {React.cloneElement(currentStep, {
                        onAction: this.onAction,
                        wizardContext: wizardContext

                    })}
                    <Navigation changeCurrentStep={this.changeCurrentStep} stepsIndex={stepsIndex} showConfirm={stepsIndex === steps.length - 1} />
                </div>
            </div>
        )
    }
}

export default Wizard;

Wizard.propTypes = {
    header: PropTypes.func.isRequired,
    steps: PropTypes.array.isRequired,
    wizardContext: PropTypes.object.isRequired,
    onComplete: PropTypes.func.isRequired
};