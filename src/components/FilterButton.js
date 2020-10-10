import React from 'react';

export default function FilterButton(props) {
    return (
        <button type="button" className="btn toggle-btn" aria-pressed={props.ariaPressed}>
            <span className="visually-hidden">Show</span>
            <span>{props.filterName}</span>
            <span className="visually-hidden">tasks</span>
        </button>
    );
}