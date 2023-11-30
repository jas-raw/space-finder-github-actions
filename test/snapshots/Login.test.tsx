import {Login} from "../../src/components/Login"
import { create } from "react-test-renderer"

describe("Login component snapshot", () => {
    
    test("initial test", () => {
        const snap = create(<Login 
            authService={{} as any}
            setUser={{} as any}
        />)
        expect(snap).toMatchSnapshot()
    })
    // npm run jest -- -u (crea un nuevo snapshot en vez de comparar)
})