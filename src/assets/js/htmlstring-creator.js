function createImageHTML (url, height, width) {
    var htmlString = `<img src="${url}"`
    if (height) {
        htmlString += ` height="${height}"`
    }

    if (width) {
        htmlString += ` width="${width}"`
    }

    htmlString += ` />`
    return htmlString
}

function createLinkHTML (url, text) {
    var htmlString = `<a href="${url}">`
    if (text) {
        htmlString += `${text}`
    }
    else {
        htmlString += `${url}`
    }
    htmlString += `</a>`
    return htmlString
}

function createYoutubeHTML (url, height, width) {
    var videoId = url.replace('https://', '').replace('http://', '').replace('www.youtube.com/watch?v=', '').replace('youtu.be/', '')
    var htmlString = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen`

    if (height) {
        htmlString += ` height=${height}`
    }

    if (width) {
        htmlString += ` width=${width}`
    }

    htmlString += ` ></iframe>`
    return htmlString
}

function sanitizeUrl (url) {
    if (url.indexOf("https://") == -1 || url.indexOf("http://") != -1) {
        return `https://${url}`
    }

    return url
}

class HTMLStringCreator {
    constructor (htmlData) {
        this.htmlData = htmlData
    }

    getHTMLString () {
        if (this.htmlData.title == 'Insert Image') {
            return createImageHTML(this.htmlData.Url, this.htmlData.Height, this.htmlData.Width)
        }
        else if (this.htmlData.title == 'Insert Link') {
            return createLinkHTML(this.htmlData.Url, this.htmlData.Text)
        }
        else if (this.htmlData.title == 'Insert Youtube Video') {
            return createYoutubeHTML(this.htmlData.Url, this.htmlData.Height, this.htmlData.Width)
        }
        else if (this.htmlData.title == 'Insert HTML') {
            return this.htmlData.HTMLCode
        }
    }
}

module.exports = HTMLStringCreator
