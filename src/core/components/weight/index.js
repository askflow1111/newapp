import React from 'react';
// import logo from './logo.svg';
// import './app.css';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class Weight extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weight: ""
        };
    }

    componentDidMount() {
        this.updateCurrentData();
    }

    componentWillUnmount() {
        this.updateWizardContext(this.props.wizardContextKey, this.state);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return ((JSON.stringify(this.state) !== JSON.stringify(nextState)) || this.props.title !== nextProps.title)
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.wizardContextKey !== this.props.wizardContextKey) {
            await this.props.updateWizardContext(prevProps.wizardContextKey, prevState);
            await this.updateCurrentData();
        }
    }

    updateWizardContext = (wizardContextKey, data) => {
        let value = this.props.wizardContext[wizardContextKey];
        let isValueObj = typeof value === 'object' && value !== null;
        let newWizardContextData = isValueObj ? data : Object.values(data)[0];
        this.props.onAction(wizardContextKey, newWizardContextData);

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
                <h5 className="title">{title || "Enter your shipping weight"}</h5>
                <TextField
                    id="outlined-name"
                    label="Weight"
                    name="weight"
                    value={this.state.weight}
                    onChange={this.handleOnChange}
                    type={"number"}
                    margin="normal"
                    variant="outlined"
                />

            </div>
        )

    }




}

export default Weight;