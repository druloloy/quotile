import DomToImage from 'dom-to-image';
import * as FI from 'react-icons/fi'
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
function Controls({ quote }) {

    const hrefLink = `https://twitter.com/intent/tweet?hashtags=quotile&text=${encodeURIComponent(`"${quote?.content}" —  ${quote?.author}`)}`;
    const TOAST = {
        success: (message)=>{
            toast(message, {type:'success'})
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
        navigator.clipboard.writeText(text).then(_=>{
            TOAST.success("Copied to clipboard!");
        })
        .catch(e=>{
            TOAST.failed("Error occured while copying to clipboard.");
        });
        
    }

    return (    
        <div className="controls">
            <div id="controls-container">
                <button className="icon" data-tip="Save as PNG" onClick={save} id="save-quote">
                    <FI.FiSave />
                </button>
                <a className="icon" data-tip="Tweet this quote" id="tweet-quote" href={hrefLink}>
                    <FI.FiTwitter />
                </a>
                <button className="icon" data-tip="Copy to clipboard" id="copy-quote" onClick={copy}>
                    <FI.FiCopy />
                </button>

                <ReactTooltip place="bottom" type="light" textColor="#2522ca"/>
            </div>
            <div className="info">
                <FI.FiInfo id="info" /> 
                <p>Double tap the quote <FI.FiSquare/> to generate new quote.</p>
            </div>
        </div>
    )
}

export default Controls;
