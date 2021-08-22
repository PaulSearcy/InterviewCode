import React from 'react';
import { screen, render, fireEvent, getRoles, logRoles } from '@testing-library/react';
import { assert } from 'chai';
import NativeDatePickerContainer from './NativeDatePickerContainer.js';

const defaultRender = props => render(
    <NativeDatePickerContainer
        {...props}
    />
);

it('should render a container with a date input', async () => {
    defaultRender();
    assert.ok(screen.queryByRole('date'), 'Input with custom role "date" was found');
});

it('should render proper date formats when date is given', async () => {
    defaultRender();
    fireEvent.change(screen.queryByRole('date'), { target: { value: '2021-08-12' } });
    assert.ok(screen.queryByText('2021-08-12'), 'Date only found');
    assert.ok(screen.queryByText('Wed Aug 11 2021 19:00:00 GMT-0500 (Central Daylight Time)'), 'JS Date found');
    assert.ok(screen.queryByText('2021-08-12T00:00:00.000Z'), 'ISO Date found');
    assert.ok(screen.queryByText('8/11/2021, 7:00:00 PM'), 'US English Datetime found');
});