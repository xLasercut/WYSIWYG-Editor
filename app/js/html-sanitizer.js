const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
}


class HTMLSanitizer {
    sanitizeHTML (html) {
        var htmlString = String(html)
        htmlString = htmlString.split("<div><br></div>").join("\n")

        htmlString = htmlString.split("<div>").join("\n")

        htmlString = htmlString.split("</div>").join("")

        return htmlString.replace(/[&<>"'`=\/]/gi, function (s) {
            return entityMap[s]
        })
    }
}

module.exports = HTMLSanitizer
