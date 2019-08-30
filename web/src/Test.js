import React from 'react'

const Test = ({ test }) => {
    console.log(test)
    return (
        <div>
            We have {test.count} votings so far<br/>{Object.keys(test.champions).map(champ => <div>{champ}<br/></div>)}
        </div>
    );
};

export default Test