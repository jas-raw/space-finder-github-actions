import { User, UserAttribute } from "../model/Model";

export class AuthService{

    public async login(userName: string, password: string): Promise<User | undefined>{
        if(userName === "user" && password === "1234"){
            return {
                userName: userName,
                email: "some@gmail.com"
            }
        }
        else{
            return undefined
        }
    }

    public async getUserAttributes(user: User):Promise<UserAttribute[]>{
        const result: UserAttribute[] = []
        result.push({
            Name: "",
            Value: ""
        }) 
        return result
    }
    
}