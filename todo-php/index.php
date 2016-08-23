<?php

require_once './todo-controller.php'

?><!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        * {
            font-family: sans-serif;
        }
    </style>
</head>
<body>
    <?php foreach ($todos as $todo) {?>
    <div class="todo">
        <p><?= $todo['description'] ?></p>
        <p><?= $todo['due'] ?></p>
    </div>
    <?php } ?>

    <form method="POST" action="/store.php">
        <label for="description">
        <input name="description" id="description">
        <label for="due">
        <input type="date" name="due" id="due">
        <button type="submit">Store todo</button>
    </form>
    <script src="https://code.jquery.com/jquery-3.1.0.js" integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk=" crossorigin="anonymous"></script>
</body>
</html>
