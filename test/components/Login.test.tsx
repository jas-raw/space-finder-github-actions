import ReactDOM from "react-dom"
import { Login } from "../../src/components/Login"
import { fireEvent, waitFor } from "@testing-library/react"
import { User } from "../../src/model/Model"
import history from "../../src/utils/history"

const someUser: User = {
    userName: "someUser",
    email: "someEmail"
}

describe("Login component test suite", () => {

    let container: HTMLDivElement
    const authServiceMock = {
        login: jest.fn()
    }
    const setUserMock = jest.fn()
    const historyMock = history

    historyMock.push = jest.fn()

    /*
    beforeAll(() => {
        console.log("before all")
    })
    afterAll(() => {
        console.log("after all")
    })
    */
    
    beforeEach(() => {
        console.log("before each")
        container = document.createElement("div")
        document.body.appendChild(container)
        ReactDOM.render(
            <Login authService={authServiceMock as any} setUser={setUserMock} />,
            container
        )
    })
    afterEach(() => {
        console.log("after each")
        document.body.removeChild(container)
        container.remove()
        jest.clearAllMocks()
    })

    /*
    test("initial test", () => {
        expect(true).toBeTruthy()
    })
    */

    test("renders correctly initial components", () => {
        const title = document.querySelector("h2")
        expect(title!.textContent).toBe("Please Login")

        const inputs = document.querySelectorAll("input")
        expect(inputs).toHaveLength(3)
        expect(inputs[0].value).toBe("")
        expect(inputs[1].value).toBe("")
        expect(inputs[2].value).toBe("Login")

        const label = document.querySelector("label")
        expect(label).not.toBeInTheDocument()
    })

    test("Passes credential correctly", () => {
        const inputs = document.querySelectorAll("input")
        const loginInput = inputs[0]
        const passwordInput = inputs[1]
        const loginButton = inputs[2]

        fireEvent.change(loginInput, {target: {value: "some"}})
        fireEvent.change(passwordInput, {target: {value: "some"}})
        fireEvent.click(loginButton)

        expect(authServiceMock.login).toBeCalledWith(
            "some",
            "some"
        )
    })

    test("Correctly handles login success", async () => {
        authServiceMock.login.mockResolvedValueOnce(someUser)
        const inputs = document.querySelectorAll("input")
        const loginInput = inputs[0]
        const passwordInput = inputs[1]
        const loginButton = inputs[2]

        fireEvent.change(loginInput, {target: {value: "some"}})
        fireEvent.change(passwordInput, {target: {value: "some"}})
        fireEvent.click(loginButton)

        const statusLabel = await waitFor(() => container.querySelector("label"))
        expect(statusLabel).toBeInTheDocument()
        expect(statusLabel).toHaveTextContent("Login success")
        expect(setUserMock).toBeCalledWith(someUser)
        expect(historyMock.push).toBeCalledWith("/profile")

    })

    test("Correctly handles login failed", async () => {
        authServiceMock.login.mockResolvedValueOnce(undefined)
        const inputs = document.querySelectorAll("input")
        const loginInput = inputs[0]
        const passwordInput = inputs[1]
        const loginButton = inputs[2]

        fireEvent.change(loginInput, {target: {value: "some"}})
        fireEvent.change(passwordInput, {target: {value: "some"}})
        fireEvent.click(loginButton)

        const statusLabel = await waitFor(() => container.querySelector("label"))
        expect(statusLabel).toBeInTheDocument()
        expect(statusLabel).toHaveTextContent("Login failed")

    })
})

export {}