import { getByTestId } from "@testing-library/react"
import ReactDOM from "react-dom"
import { StaticRouter } from "react-router-dom/server"
import { Navbar } from "../../src/components/Navbar"
import { User } from "../../src/model/Model"

describe("Navbar test suite", () => {

    let container: HTMLDivElement
    const someUser: User = {
        userName: "username",
        email: "email"
    }
    const baseLink = "http://localhost"

    afterEach(() => {
        document.body.removeChild(container)
        container.remove()
    })

    /*
    test("renders correctly with user", ()=> {
        container = document.createElement("div")
        document.body.appendChild(container)
        ReactDOM.render(<StaticRouter>
            <Navbar user={someUser} />
        </StaticRouter>, container)
        const links = container.querySelector("a")
        expects(links[0].href).toBe(baseLink+"/")
        expects(links[1].href).toBe(baseLink+"/profile")
        expects(links[2].href).toBe(baseLink+"/spaces")
        expects(links[3].href).toBe(baseLink+"/logout")
    })
    */

    test("renders correctly with user using data test", ()=> {
        container = document.createElement("div")
        document.body.appendChild(container)
        ReactDOM.render(<StaticRouter location={baseLink}>
            <Navbar user={someUser} />
        </StaticRouter>, container)
        const homelink = getByTestId(container, "home-link") as HTMLAnchorElement;
        expect(homelink.href).toBe(baseLink+"/")
        const profilelink = getByTestId(container, "profile-link") as HTMLAnchorElement;
        expect(profilelink.href).toBe(baseLink+"/profile")
        const spaceslink = getByTestId(container, "spaces-link") as HTMLAnchorElement;
        expect(spaceslink.href).toBe(baseLink+"/spaces")
        const logoutlink = getByTestId(container, "logout-link") as HTMLAnchorElement;
        expect(logoutlink.href).toBe(baseLink+"/logout")
    })

    test("renders correctly without user using data test", ()=> {
        container = document.createElement("div")
        document.body.appendChild(container)
        ReactDOM.render(<StaticRouter location={baseLink}>
            <Navbar user={undefined} />
        </StaticRouter>, container)
        const homelink = getByTestId(container, "home-link") as HTMLAnchorElement;
        expect(homelink.href).toBe(baseLink+"/")
        const profilelink = getByTestId(container, "profile-link") as HTMLAnchorElement;
        expect(profilelink.href).toBe(baseLink+"/profile")
        const spaceslink = getByTestId(container, "spaces-link") as HTMLAnchorElement;
        expect(spaceslink.href).toBe(baseLink+"/spaces")
        const loginlink = getByTestId(container, "login-link") as HTMLAnchorElement;
        expect(loginlink.href).toBe(baseLink+"/login")
    })
})