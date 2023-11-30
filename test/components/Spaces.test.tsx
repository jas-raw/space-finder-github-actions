import { fireEvent } from "@testing-library/react"
import React from "react"
import ReactDOM from "react-dom"
import { Spaces } from "../../src/components/spaces/Spaces"

describe("Space test suite", () => {

    let container: HTMLDivElement
    const reserveSpaceMock = jest.fn()
    const baseLink = "http://localhost/"

    const cleanUpTest = () => {
        document.body.removeChild(container)
        container.remove()
        jest.clearAllMocks()
    }

    const setUpTest = (element: React.FunctionComponentElement<any>) => {
        container = document.createElement("div")
        document.body.appendChild(container)
        ReactDOM.render(element, container)
    }

    describe("test with photo url", () => {
        beforeEach(() => setUpTest(<Spaces 
                location={"someLocation"}
                name={"someName"}
                reserveSpace={reserveSpaceMock}
                spaceId={"123"}
                photoUrl={"some.url"}
            />))

        test("show image correctly", () => {
            const image = container.querySelector("img")
            expect(image!).toBeInTheDocument()
            expect(image!.src).toBe(baseLink+"some.url")
        })

        test("show labels correctly", () => {
            const label = container.querySelectorAll("label")
            expect(label[0]!).toHaveTextContent("someName")
            expect(label[1]!).toHaveTextContent("123")
            expect(label[2]!).toHaveTextContent("someLocation")
        })

        test("reserving spaces", () => {
            const button = container.querySelector("button")
            fireEvent.click(button!)
            expect(reserveSpaceMock).toBeCalledWith("123")
        })

        afterEach(() => cleanUpTest())
        
    })

    describe("test without photo url", () => {

        beforeEach(() => setUpTest(<Spaces 
                location={"someLocation"}
                name={"someName"}
                reserveSpace={reserveSpaceMock}
                spaceId={"123"}
            />,))

        test("show image correctly", () => {
            const image = container.querySelector("img")
            expect(image!).toBeInTheDocument()
            expect(image!.src).toBeFalsy()
        })

        afterEach(() => cleanUpTest())

    })

    

})