module.exports = {
    insertImage: {
        title: "Insert Image",
        inputs: [
            {
                type: "input",
                inputType: "text",
                placeholder: "https://",
                name: "Url"
            },
            {
                type: "input",
                inputType: "number",
                name: "Height"
            },
            {
                type: "input",
                inputType: "number",
                name: "Width"
            }
        ]
    },
    insertLink: {
        title: "Insert Link",
        inputs: [
            {
                type: "input",
                inputType: "text",
                placeholder: "https://",
                name: "Url"
            },
            {
                type: "input",
                inputType: "text",
                name: "Text"
            }
        ]
    },
    insertYoutube: {
        title: "Insert Youtube Video",
        inputs: [
            {
                type: "input",
                inputType: "text",
                placeholder: "https://",
                name: "Url"
            },
            {
                type: "input",
                inputType: "number",
                name: "Width"
            },
            {
                type: "input",
                inputType: "number",
                name: "Height"
            }
        ]
    },
    insertCode: {
        title: "Insert HTML",
        inputs: [
            {
                type: "textarea",
                placeholder: "HTML Code...",
                name: "HTMLCode"
            }
        ]
    }
}
