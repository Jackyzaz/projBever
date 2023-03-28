import React from 'react'

const CostEst = () => {
    return (
        <>
            <option value={9}> No Cost</option>
            <option value={8}>&le; 100 &#3647; </option>
            <option value={7}>100 ~ 300 &#3647;</option>
            <option value={6}>300 ~ 500 &#3647;</option>
            <option value={5}>500 ~ 1000 &#3647;</option>
            <option value={4}>1000 ~ 1500 &#3647;</option>
            <option value={3}>1500 ~ 3000 &#3647;</option>
            <option value={2}>3000 ~ 5000 &#3647;</option>
            <option value={1}>&ge; 5000 &#3647;</option><div>CostEst</div>
        </>
    )
}

export default CostEst