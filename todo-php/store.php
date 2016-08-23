<?php

require_once 'classes.php';
require_once 'functions.php';

$todo = new Todo($_POST['description'], $_POST['due']);

if ($todo->save())
{
    header('Location: ' . '/');
}
else
{
    echo 'An error occurred when saving the todo.';
}
