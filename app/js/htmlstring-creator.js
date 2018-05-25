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
    constructor (tag, url, height, width, text, textarea) {
        this.tag = tag
        this.url = sanitizeUrl(url)
        this.height = height
        this.width = width
        this.text = text
        this.textarea = textarea
    }

    getHTMLString () {
        if (this.tag == 'insertImage') {
            return createImageHTML(this.url, this.height, this.width)
        }
        else if (this.tag == 'insertLink') {
            return createLinkHTML(this.url, this.text)
        }
        else if (this.tag == 'insertYoutube') {
            return createYoutubeHTML(this.url, this.height, this.width)
        }
        else if (this.tag == 'insertCode') {
            return this.textarea
        }
    }
}

module.exports = HTMLStringCreator
