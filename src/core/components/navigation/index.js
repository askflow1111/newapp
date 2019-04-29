import React from "react";
import Button from '@material-ui/core/Button';

const Navigation = props => {
    const { changeCurrentStep, stepsIndex, showConfirm } = props;
    return (
        <div className="navigation">

            {stepsIndex > 0 ? (<Button onClick={() => changeCurrentStep(1)} variant="contained" color="primary">
                Previous
            </Button>) : null}
            {!showConfirm ?
                (<Button onClick={() => changeCurrentStep(2)} variant="contained" color="primary">Next</Button>) :
                (<Button onClick={() => changeCurrentStep(3)} variant="contained" color="primary">Cofirm + Print</Button>)
            }


        </div>
    )
};

export default Navigation;
