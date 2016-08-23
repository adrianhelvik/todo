<?php

function db_connect() {
    $connection = new mysqli('192.168.10.10', 'homestead', 'secret', 'todo');

    if ($connection->connect_error) {
        return false;
    }

    return $connection;
}
