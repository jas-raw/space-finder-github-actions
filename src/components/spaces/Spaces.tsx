import { Component } from "react";
import imgGeneric from "../../assets/gni.jpg"
import "./spaces.css"

interface SpaceProps{
    spaceId: string
    location: string
    name: string
    photoUrl?: string
    reserveSpace: (spaceId: string) => void
}

export class Spaces extends Component<SpaceProps>{

    private rederImage(){
        if(this.props.photoUrl){
            return <img alt="" src={this.props.photoUrl}/>
        }else{
            return <img alt="" src={imgGeneric}/>
        }
    }

    render(){
        return <div className="component">
            {this.rederImage()}
            <label className="name" htmlFor="">{this.props.name}</label>
            <br />
            <label className="id" htmlFor="">{this.props.spaceId}</label>
            <br />
            <label className="location" htmlFor="">{this.props.location}</label>
            <br />
            <button onClick={() => this.props.reserveSpace(this.props.spaceId)}>Reserve</button>
        </div>
    }
}