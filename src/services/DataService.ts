import { Space } from "../model/Model";

export class DataService{

    public async getSpaces(): Promise<Space[]>{
        const result: Space[] = []
        result.push({
            location: "Paris",
            name: "Best",
            spaceId: "123"
        })
        return result
    }

    public async reserveSpace(spaceId: string): Promise<string | undefined>{
        if(spaceId === "1234"){
            return ("55555")
        }else{
            return undefined
        }
    }
}