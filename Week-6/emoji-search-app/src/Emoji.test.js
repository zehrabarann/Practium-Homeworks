import {render, screen} from "@testing-library/react"
import React from "react";
import userEvent from "@testing-library/user-event";

import Header from "./Header"
import App from "./App";

describe("Emoji Test" , () => {
    test("Header componenti başarılı bir şekilde render edilmeli", () => {
        render(<Header/>)
        const header = screen.getByText("Emoji Search")
        expect(header).toBeInTheDocument();
    })

    test("Emojiler başlangıçta listelenmeli", () => {
        render(<App/>)
        const items = screen.getAllByText("Click to copy emoji")
        expect(items.length).toEqual(20)

    })

    test("Filtreleme doğru bir şekilde çalışmalı", () => {
        render(<App/>)
        const emoji = screen.getByText("Joy");
        expect(emoji).toBeInTheDocument()
    })

    test("Emoji kopyalama başarılı bir şekilde olmalı", () => {
        render(<App/>)
        const copyEmoji = screen.getAllByText("Click to copy emoji").at(0);
        const parent = copyEmoji.parentElement;
        expect(parent.getAttribute("data-clipboard-text").length).toBeGreaterThan(0);
    })
})