import React from 'react';
import './app.css';

import ShippingLabelMaker from './features/shipping-label-maker/index'
class App extends React.Component {

  render() {
    return (
      <div >
        <ShippingLabelMaker />
      </div>
    )

  }
}

export default App;
