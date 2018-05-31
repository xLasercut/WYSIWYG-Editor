const request = require('request')
const q = require('q')
const fs = require('fs')

class NeocitiesHelper {
    constructor (apiKey) {
        this.apiKey = apiKey
        this.baseUrl = "https://neocities.org"
    }

    getItem (apiUrl) {
        var deferred = q.defer()
        var requestOptions = {
            url: `${this.baseUrl}${apiUrl}`,
            method: "GET",
            auth: {
                bearer: this.apiKey
            }
        }
        request(requestOptions, function (err, response, body) {
            if (err) {
                deferred.reject(err)
            }
            else if (response.statusCode != 200) {
                deferred.reject(`Server error! status code: ${response.statusCode}`)
            }
            else {
                deferred.resolve(JSON.parse(body))
            }
        })
        return deferred.promise
    }

    postItem (apiUrl, requestOptions) {
        var deferred = q.defer()
        requestOptions["url"] = `${this.baseUrl}${apiUrl}`
        requestOptions["method"] = "POST"
        requestOptions["auth"] = { bearer: this.apiKey }
        request(requestOptions, function (err, response, body) {
            if (err) {
                deferred.reject(err)
            }
            else if (response.statusCode != 200) {
                deferred.reject(`Server error! status code: ${response.statusCode}`)
            }
            else {
                deferred.resolve(JSON.parse(body))
            }
        })
        return deferred.promise
    }

    getServerList (dir = null) {
        var apiUrl = "/api/list"
        if (dir) {
            apiUrl += `?path=${dir}`
        }
        return this.getItem(apiUrl)
    }

    uploadFile (serverFile, localFile) {
        var formData = {}
        formData[serverFile] = fs.createReadStream(localFile)
        var requestOptions = {
            formData: formData
        }
        return this.postItem("/api/upload", requestOptions)
    }

    deleteFile (serverFile) {
        var formData = {}
        formData["filenames[]"] = serverFile
        var requestOptions = {
            formData: formData
        }
        return this.postItem("/api/delete", requestOptions)
    }

}

module.exports = NeocitiesHelper
