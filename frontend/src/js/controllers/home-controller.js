class HomeController {
    constructor(TodoResource, $q) {
        'ngInject';

        this.resource = TodoResource;
        this.$q = $q;

        this.todos = [];
        this.newTodo = {};

        this.fetch();
    }

    fetch() {
        this.resource.all()
            .then(todos => {
                this.todos = todos;
            });
    }

    submit() {
        this.resource.create(this.newTodo)
            .then(this.fetch.bind(this))
            .then(() => {
                this.newTodo = {};
            });
    }

    delete(todo) {
        this.resource.destroy(todo._id)
            .then(() => {
                this.todos.splice(this.todos.indexOf(todo), 1);
            })
            .then(this.fetch.bind(this));
    }
}

module.exports = HomeController;
