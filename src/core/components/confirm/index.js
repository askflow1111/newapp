import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const ShippingOption = {
    ground: 1,
    priority: 2
}

const shippingRate = 0.40;

class Confirm extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         wizardContext: props.wizardContext,
    //     }
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return ((JSON.stringify(this.state.wizardContext) !== JSON.stringify(nextState.wizardContext)))
    // }

    // componentDidUpdate(nextProps, nextState) {
    //     this.setState({
    //         wizardContext: this.props.wizardContext,
    //     })
    // }

    renderFieldsSet = (obj, title) => {
        if (obj) {

            return (
                <div className={title}>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend">{title}</FormLabel>
                        <div className="fields">

                            {Object.entries(obj).map(item => {
                                let value = item[1];
                                return (

                                    <TextField
                                        key={item[0]}
                                        id="outlined-read-only-input"
                                        label={item[0]}
                                        value={item[1]}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                )
                            })}
                        </div>
                    </FormControl>
                </div>
            )
        }

        return null;
    }


    getShippingRate = (weight, shippingOption) => {
        return (weight * shippingRate *
            (shippingOption === ShippingOption.ground ? 1 : 1.5)).toFixed(2);
    }

    render() {
        const { wizardContext } = this.props;
        let shippingCost = this.getShippingRate(wizardContext.weight, Number(wizardContext.shippingOption));

        return (
            <div className="confirmContainer">
                {this.renderFieldsSet(wizardContext.from, 'From')}
                {this.renderFieldsSet(wizardContext.to, 'To')}
                {this.renderFieldsSet({ shippingOption: wizardContext.shippingOption == 1 ? "Ground" : "Priority"}, 'Shipping Option')}
                {this.renderFieldsSet({ shippingCost: shippingCost }, 'Shipping Cost')}
            </div>
        )
    }
}

export default Confirm;