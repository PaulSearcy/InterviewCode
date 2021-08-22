import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { isValidDate, setStateWithDate } from '../util/common.js';

const NativeDatePicker = (props) => {
    const {
        name = 'start',
        id = null,
        onChange,
        required = false,
    } = props;

    const today = new Date().toISOString().substr(0, 10);
    const [startDate, setStartDate] = useState(() => setStateWithDate(props.start));
    const [minDate, setMinDate] = useState(() => setStateWithDate(props.minDate));
    const [maxDate, setMaxDate] = useState(() => setStateWithDate(props.maxDate, false, today));

    useEffect(() => {
        setStartDate(setStateWithDate(props.start));
        setMinDate(setStateWithDate(props.minDate));
        setMaxDate(setStateWithDate(props.maxDate, false, today));
    }, [props.start, props.minDate, props.maxDate]);

    const dateCheck = event => {
        const eventValue = event.target.value;
        if (eventValue === '' || isValidDate(eventValue)) {
            setStartDate(eventValue);
            onChange(eventValue);
        }
    };

    const style = {
        borderRadius: 5,
        outline: 'none',
        border: 'black 1px solid',
        width: 200,
        height: 25,
        textIndent: 4,
        cursor: 'pointer',
    }

    return (
        <input
            style={style}
            type="date"
            step="1"
            name={name}
            id={id}
            min={minDate}
            max={maxDate}
            value={startDate || ''}
            onChange={event => dateCheck(event)}
            required={required}
            placeholder="mm/dd/yyyy"
            role="date"
        />
    );
};

NativeDatePicker.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    start: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
};

export default NativeDatePicker;
