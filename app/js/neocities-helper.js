const request = require('request')
const q = require('q')

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
                deferred.reject(response.statusCode)
            }
            else {
                deferred.resolve(JSON.parse(body))
            }
        })
        return deferred.promise
    }

    postItem (apiUrl, formData) {
        var deferred = q.defer()
        var requestOptions = {
            url: `${this.baseUrl}${apiUrl}`,
            method: "POST",
            auth: {
                bearer: this.apiKey
            },
            formData: formData
        }
        request(requestOptions, function (err, response, body) {
            if (err) {
                deferred.reject(err)
            }
            else if (response.statusCode != 200) {
                deferred.reject(response.statusCode)
            }
            else {
                deferred.resolve(JSON.parse(body))
            }
        })
        return deferred.promise
    }

}

module.exports = NeocitiesHelper
