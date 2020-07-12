import React from 'react';


const ParamDemo = props=>{
    const paramValue=props.computedMatch.params.param;
    return (<div className="page-container">
    Your param is: {paramValue}
    </div>);
};

export default ParamDemo;