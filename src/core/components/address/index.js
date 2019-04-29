import React from 'react';
// import logo from './logo.svg';
// import './app.css';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';


class Address extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            street: "",
            city: "",
            state: "",
            zip: "",
        }
    }


    componentDidMount() {
        console.log('componentDidMount address');
        this.updateCurrentData();
    }

    componentWillUnmount() {
        this.props.onAction(this.props.wizardContextKey, this.state)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return ((JSON.stringify(this.state) !== JSON.stringify(nextState)) || this.props.title !== nextProps.title)
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.wizardContextKey !== this.props.wizardContextKey) {
            await this.props.onAction(prevProps.wizardContextKey, prevState);
            await this.updateCurrentData();
        }
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    updateCurrentData = () => {
        let data = this.props.wizardContext[this.props.wizardContextKey];

        this.setState({
            ...data
        })
    }

    render() {
        const { title } = this.props;

        const fields = [
            { name: 'name', isNumber: false, },
            { name: 'street', isNumber: false, },
            { name: 'city', isNumber: false, },
            { name: 'state', isNumber: false, },
            { name: 'zip', isNumber: true, },
        ]

        return (
            <div >
                <h5 className="title">{title || "Enter the address"}</h5>
                <div className="textFieldsContainer">
                    {
                        fields.map(item => {
                            return (
                                <TextField
                                    key={item.name}
                                    id="outlined-name"
                                    label={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                    name={item.name}
                                    value={this.state[item.name]}
                                    onChange={this.handleOnChange}
                                    type={item.isNumber ? "number" : "string"}
                                    margin="normal"
                                    variant="outlined"
                                />
                            )
                        })
                    }
                </div>
            </div>
        )

    }




}

export default Address;





