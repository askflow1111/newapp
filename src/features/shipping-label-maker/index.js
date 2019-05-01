import React from 'react';

import '../../app.css';
import Wizard from "../../core/components/wizard/index";
import Steps from "./steps/index";

class ShippingLabelMaker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shippingInfo: {
        from: {
          name: "",
          street: "",
          city: "",
          state: "",
          zip: "",
        },
        to: {
          name: "",
          street: "",
          city: "",
          state: "",
          zip: "",
        },
        weight: "",
        shippingOption: "",
      }
    }
  }

  onComplete = (data) => {
    window.print();
  }

  header = () => {
    return (
      <h1>Shipping Label Maker</h1>
    )
  }

  render() {
    return (
        <Wizard
          header={this.header}
          steps={Steps}
          wizardContext={this.state.shippingInfo}
          onComplete={this.onComplete}
        />
    )
  }

}

export default ShippingLabelMaker;

