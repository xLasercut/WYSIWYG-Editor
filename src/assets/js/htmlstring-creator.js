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

function createExpImgHTML (url, startWidth, maxWidth) {
    var htmlString = `
        <img
            src="${url}"
            style="cursor: pointer; transition: all 0.3s;"
            width="${startWidth}"
            onclick="
                if (this.width != ${maxWidth}) {
                    this.width = ${maxWidth}
                }
                else {
                    this.width = ${startWidth}
                }
            "
        />
    `
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
        switch (this.htmlData.title) {
            case 'Insert Image':
                return createImageHTML(this.htmlData.Url, this.htmlData.Height, this.htmlData.Width)
                break
            case 'Insert Link':
                return createLinkHTML(this.htmlData.Url, this.htmlData.Text)
                break
            case 'Insert Youtube Video':
                return createYoutubeHTML(this.htmlData.Url, this.htmlData.Height, this.htmlData.Width)
                break
            case 'Insert HTML':
                return this.htmlData.HTMLCode
                break
            case 'Insert Expandable Image':
                return createExpImgHTML(this.htmlData.Url, this.htmlData.Start_Width, this.htmlData.End_Width)
                break
        }
    }
}

module.exports = HTMLStringCreator
