import { fireEvent, waitFor } from "@testing-library/react"
import ReactDOM from "react-dom"
import { SpacesContainer } from "../../src/components/spaces/SpacesContainer"
import { DataService } from "../../src/services/DataService"

describe("Spaces component test Suite", () => {
    
    const dataServiceMock = {
        getSpaces: jest.fn(),
        reserveSpaces: jest.fn()
    }
    let container: HTMLDivElement

    beforeEach(() => {
        container = document.createElement("div")
        document.body.appendChild(container)
        ReactDOM.render(<SpacesContainer 
            dataService={(dataServiceMock as any) as DataService}
            />, container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container.remove()
        jest.clearAllMocks()
    })

    test("Render all spaces", () => {
        const buttons = document.getElementsByClassName("spaceComponent")
        expect(buttons!.length).toBe(3)
    })

    test("Correctly calls for reservation", async () => {
        const buttons = document.querySelectorAll("button")
        expect(buttons!.length).toBe(3)
        fireEvent.click(buttons[0])
        expect(dataServiceMock.reserveSpaces).toBeCalledWith("123")
    })

    test("Correctly displays modal reservation", async () => {
        dataServiceMock.reserveSpaces.mockResolvedValueOnce("555")
        const buttons = document.querySelectorAll("button")
        fireEvent.click(buttons[0])
        expect(dataServiceMock.reserveSpaces).toBeCalledWith("123")
        const modalValue = await waitFor(() => document.getElementsByClassName("modalTest"))
        expect(modalValue[0]).toHaveTextContent("You cant reserve")
    })

})