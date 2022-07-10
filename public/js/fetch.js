class Fetch{
    constructor(){
        
    }

    static async request(method, url, params = {}){
        return new Request(url, {
            method,
            body: JSON.stringify(params),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
    }

    static async get(url, params = {}){
        let response = await fetch(url)
        let json = await response.json()
        return json
    }

    static async getID(url, params = {}){
        let response = await fetch(url)
        let json = await response.json()
        return json
    }

    static async post(url, params){
        let request = await Fetch.request('POST', url, params)
        let response = await fetch(request)
        let json = await response.json()
        return json
    }

    static async put(url, params){
        let request = await Fetch.request('PUT', url, params)
        let response = await fetch(request)
        let json = await response.json()
        return json
    }

    static async delete(url, params){
        let request = await Fetch.request('DELETE', url, params)
        let response = await fetch(request)
        let json = await response.json()
        return json
    }
}