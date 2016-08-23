class HomeController {
    constructor(TodoResource) {
        'ngInject';

        this.resource = TodoResource;

        this.fetch();

        this.newTodo = {};
    }

    fetch() {
        this.resource.all()
            .then(todos => {
                this.todos = todos;
            });
    }

    submit() {
        this.resource.create(this.newTodo)
            .then(this.fetch.bind(this));
    }

    delete(todo) {
        this.resource.destroy(todo._id)
            .then(this.fetch.bind(this));
    }
}

module.exports = HomeController;
