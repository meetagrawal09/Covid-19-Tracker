import React from 'react';

import './Table.css';

function Table({countries}) {
    return (
        <div className="table">
            {/* map through the countries array and for each country return the following */}

            {/* we do de-structuring at this point inside map function */}
            {countries.map(({country,cases}) => (
                <tr>
                    <td>{country}</td>
                    <td><strong>{cases}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
