import React from 'react';

export default function IsLoading ({isLoading}) {
    return (
        <a className={`button is-white ${isLoading ? 'is-loading' : ''}`} style={{position:'fixed', bottom:0, left:0,background:'transparent'}}></a>
    );
}