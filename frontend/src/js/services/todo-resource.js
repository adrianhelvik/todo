class TodoResource {
    constructor($http, apiUrl) {
        'ngInject';

        this.$http = $http;
        this.apiUrl = apiUrl;
        this.baseUrl = apiUrl + '/todos';
    }

    get(id) {
        return this.$http.get(this.baseUrl + id)
            .then(response => response.data.data);
    }

    all() {
        return this.$http.get(this.baseUrl)
            .then(response => response.data.data);
    }

    destroy(id) {
        return this.$http.delete(this.baseUrl + '/' + id)
            .then(response => response.data.data);
    }

    update(id) {
        return this.$http.put(this.baseUrl + '/' + id)
            .then(response => response.data.data);
    }

    create(data) {
        return this.$http.post(this.baseUrl, data)
            .then(response => response.data.data);
    }
}

module.exports = TodoResource;
