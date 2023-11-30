import { Component } from "react";
import "./modal.css"

interface ModalProps{
    show: boolean
    content: string
    close: () => void
}

export class ConfirmModal extends Component<ModalProps>{

    render(){
        if(!this.props.show){
            return null
        }else{
            return <div className="modal">
                <div className="modal-content">
                    <h2>You tried to reserve and ...</h2>
                    <h3 className="modal-text">
                        {this.props.content}
                    </h3>
                    <button onClick={() => this.props.close()}>Close</button>
                </div>
            </div>
        }
    }
}