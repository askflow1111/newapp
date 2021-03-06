

import React from 'react';
import PropTypes from 'prop-types';

import Address from '../../../core/components/forms/address/index';
import Weight from '../../../core/components/forms/weight/index';
import ShippingOptions from '../../../core/components/forms/shipping-options/index';
import Confirm from '../../../core/components/confirm/index';

const steps = [
  <Address title={"Enter the sender's address:"} wizardContextKey="from" />,
  <Address title={"Enter the receiver's address:"} wizardContextKey="to" />,
  <Weight wizardContextKey="weight" />,
  <ShippingOptions wizardContextKey="shippingOption" />,
  <Confirm />,
]

steps.propTypes = {
  wizardContext: PropTypes.object.isRequired,
  onAction: PropTypes.func.isRequired
};

export default steps;
