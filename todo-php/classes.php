<?php

require_once 'functions.php';

class Todo
{
    private $description;
    private $due;

    public function __construct($description, $due)
    {
        $this->description = $description;
        $this->due = $due;
    }

    public function save()
    {
        $connection = db_connect();
        $sql_statement = 'INSERT INTO todos (description, due) VALUES (?, ?)';

        if ($statement = $connection->prepare($sql_statement))
        {
            $statement->bind_param('ss', $this->description, $this->due);
            $statement->execute();
            $statement->close();

            return ! $connection->error;
        }
        else
        {
            return false;
        }
    }

    public static function delete($id)
    {
        $sql_statement = "DELETE FROM todos WHERE id=$id";
        $connection = db_connect();

        if ($statement = $connection->prepare($sql_statement))
        {
            $statement->bind_param('ss', $this->description, $this->due);
            $statement->execute();
            $statement->close();

            return ! $connection->error;
        }
        else
        {
            return false;
        }
    }

    public static function fetch()
    {
        return db_connect()->query('SELECT * FROM todos');
    }
}
