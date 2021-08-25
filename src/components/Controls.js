import React from 'react'
import DomToImage from 'dom-to-image';
import * as FI from 'react-icons/fi'
import { toast } from 'react-toastify';

function Controls({ quote }) {

    const TOAST = {
        success: (message)=>{
            toast(message, {type:'default'})
        },
        failed: (message)=>{
            toast(message, {type:'dark'})
        }
    }

    function save(e){
        e.preventDefault();
        let node = document.querySelector(".main-frame");
        let filter = (n)=>n.id!=="controls-container";


        DomToImage.toPng(node, {quality:1,
            filter, 
            bgcolor:"#fefefe",
            width: 720,
            height: 720,})
                .then(dataUrl=>{
                    let link = document.createElement('a');
                    link.download = 'quote.png';
                    link.href = dataUrl;
                    link.click();
                    TOAST.success("Image download on progress. Please check your download folder.")
                }).catch(e=>{
                    TOAST.failed("Error downloading image.")
                })
    }
    function copy(e){
        e.preventDefault();
        const text = `"${quote?.content}" —${quote?.author}`;
        navigator.clipboard.writeText(text);
        TOAST.success("Copied to clipboard!");
    }
    return (    
        <div id="controls-container">
            <a className="icon" onClick={save} id="save-quote">
                <FI.FiSave />
            </a>
            <a className="icon" id="tweet-quote" href={`https://twitter.com/intent/tweet?hashtags=quotile&text=${encodeURIComponent(`"${quote?.content}" —  ${quote?.author}`)}`}>
                <FI.FiTwitter />
            </a>
            <a className="icon" id="copy-quote" onClick={copy}>
                <FI.FiCopy />
            </a>
        </div>
    )
}

export default Controls;
