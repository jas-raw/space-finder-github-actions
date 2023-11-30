import { Component } from "react";
import { Space } from "../../model/Model";
import { DataService } from "../../services/DataService";
import { ConfirmModal } from "./ConfirmModal";
import { Spaces } from "./Spaces";

interface SpaceState{
    spaces: Space[]
    showModal: boolean
    modalContent: string
}

interface SpaceProps{
    dataService: DataService
}

export class SpacesContainer extends Component<SpaceProps, SpaceState>{

    constructor(props: SpaceProps){
        super(props)
        this.state = {
            spaces: [],
            showModal: false,
            modalContent: ""
        }
        this.reserveSpace = this.reserveSpace.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    async componentDidMount(){
        const spaces = await this.props.dataService.getSpaces()
        this.setState({
            spaces
        })
    }

    private async reserveSpace(spaceId: string){
        const result = await this.props.dataService.reserveSpace(spaceId)
        if(result){
            this.setState({
                showModal: true,
                modalContent: "You reserve is good"
            })
        }else{
            this.setState({
                showModal: true,
                modalContent: "You can reserve"
            })
        }
    }

    private renderSpaces(){
        const rows: any[] = []
        for(const space of this.state.spaces){
            rows.push(<Spaces key={space.spaceId}
                location={space.location}
                name={space.name}
                spaceId={space.spaceId}
                reserveSpace={this.reserveSpace}
            />)
        }
        return rows
    }

    private closeModal(){
        this.setState({
            showModal: false,
            modalContent: ""
        })
    }

    render(){
        return(
            <div>
                <h2>Welcome to the Spaces page</h2>
                {this.renderSpaces()}
                <ConfirmModal close={this.closeModal} 
                show={this.state.showModal}
                content={this.state.modalContent} />
            </div>
        )
    }
}