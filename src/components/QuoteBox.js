import React, { useState, useEffect } from 'react'
import { useDoubleTap } from 'use-double-tap'; // https://github.com/minwork/use-double-tap
function QuoteBox({ quote, generate }) {
    
    const dblTap = useDoubleTap(()=>generate());

    return (
        <div id="new-quote" {...dblTap}>
            <div id="quote-box">
                <p id="watermark">QUOTILE</p>
                <p id="text"></p>
                <p id="author"></p>
            </div>
        </div>
    )
}

export default QuoteBox;