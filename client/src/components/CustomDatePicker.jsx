import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CustomDatePicker({ selected, onChange }) {
    return (
        <DatePicker 
            className='date'
            selected={selected}
            onChange={onChange}
            placeholderText="Select Date"
            showTimeSelect
            dateFormat="MMMM d, yyyy"
        />
    );
}
