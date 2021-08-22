import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { isValidDate, setStateWithDate } from '../util/common.js';
import NativeDatePicker from './NativeDatePicker.js';

const NativeDatePickerContainer = () => {

    const [exampleDate, setExampleDate] = useState('');

    const style = {
        display: 'flex',
        justifyItems: 'space-inbetween'
    };

    const splitBasis = {
        flexBasis: '50%',
        textAlign: 'center'
    };

    return (
        <>
            <h1 style={{marginBottom: 20, textAlign: 'center'}}> Date Picker Demo </h1>
            <div style={style}>
                <div style={splitBasis}>
                    <NativeDatePicker
                        name='start'
                        id='test'
                        required={false}
                        onChange={setExampleDate}
                    />
                </div>
                <div style={splitBasis}>
                    <h4>Date chosen:</h4>
                    <p>{exampleDate}</p>
                    <h4>JS Date Format</h4>
                    <p data-testid="JSDate">{isValidDate(exampleDate) ? new Date(exampleDate).toString() : ''}</p>
                    <h4>ISO Format</h4>
                    <p data-testid="ISODate">{isValidDate(exampleDate) ? new Date(exampleDate).toISOString() : ''}</p>
                    <h4>US English Datetime</h4>
                    <p data-testid="USEngDate">{isValidDate(exampleDate) ? new Date(exampleDate).toLocaleString('en-US') : ''}</p>
                </div>
            </div>
        </>
    );
};

// NativeDatePickerContainer.propTypes = {
//     name: PropTypes.string.isRequired,
//     id: PropTypes.string,
//     start: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//     minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//     maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//     onChange: PropTypes.func.isRequired,
//     required: PropTypes.bool,
// };

export default NativeDatePickerContainer;
