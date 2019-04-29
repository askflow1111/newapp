import React from 'react';
// import logo from './logo.svg';
// import './app.css';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


class ShippingOptions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shippingOption: ""
        };
    }


    componentDidMount() {
        console.log('componentDidMount address');
        this.updateCurrentData();
    }

    async componentWillUnmount() {
        await this.updateWizardContext(this.props.wizardContextKey, this.state);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return ((JSON.stringify(this.state) !== JSON.stringify(nextState)) || this.props.title !== nextProps.title)
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.wizardContextKey !== this.props.wizardContextKey) {
            // await this.updateWizardContext(prevProps.wizardContextKey, prevState);
            await this.updateCurrentData();
        }
    }

    updateWizardContext = async (wizardContextKey, data) => {
        let value = this.props.wizardContext[wizardContextKey];
        let isValueObj = typeof value === 'object' && value !== null;
        let newWizardContextData = isValueObj ? data : Object.values(data)[0];
        await this.props.onAction(wizardContextKey, newWizardContextData);
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    updateCurrentData = () => {
        let value = this.props.wizardContext[this.props.wizardContextKey];
        let isValueObj = typeof value === 'object' && value !== null;
        let newState = isValueObj ? value : { [this.props.wizardContextKey]: value };

        this.setState({
            ...newState,
        })
    }

    render() {
        const { title } = this.props;
        return (
            <div >
                <h5 className="title">{title || "Select shipping option"}</h5>
                <FormControl component="fieldset" >
                    <RadioGroup
                        aria-label="Gender"
                        name="shippingOption"
                        value={this.state.shippingOption}
                        onChange={this.handleOnChange}
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Ground" />
                        <FormControlLabel value="2" control={<Radio />} label="Priority" />
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }
}

export default ShippingOptions;