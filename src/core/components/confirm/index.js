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
    renderFieldsSet = (obj, title) => {
        if (obj) {
            return (
                <div className={title}>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend">{title}</FormLabel>
                        <div className="fields">
                            {Object.entries(obj).map(item => {
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

        const fieldsSetData = [
            { value: wizardContext.from, key: 'From' },
            { value: wizardContext.to, key: 'To' },
            { value: { shippingOption: wizardContext.shippingOption === 1 ? "Ground" : "Priority" }, key: 'Shipping Option' },
            { value: { shippingCost: shippingCost }, key: 'Shipping Cost' },
        ];

        return (
            <div className="confirmContainer">
                {fieldsSetData.map(item => this.renderFieldsSet(item.value, item.key))};
            </div>
        )
    }
}

export default Confirm;