import React from 'react'

const Champion = ({ data }) => {
    return (
        <div>
            {data.key} -> {data.name}
        </div>
    );
};

export default Champion