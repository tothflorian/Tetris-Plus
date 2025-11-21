<html lang="en">
    <head>
        <title>Tetris Leaderboards</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./style.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npt/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>

        <div class="container mt-3">

            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>

                    <?php
                    require __DIR__ . '/backend/db.php';

                    $sql = "SELECT u.username, l.score FROM leaderboard l JOIN users u ON u.id = l.user_id ORDER BY l.score DESC";
                    $run = mysqli_query($conn, $sql);

                    $n = 1;

                    while ($row = mysqli_fetch_assoc($run)) {

                    ?>

                    <tr>
                        <th scope="row"><?php print($n) ?></th>
                        <td><?php echo $row['username'] ?></td>
                        <td><?php echo $row['score'] ?></td>
                    </tr>

                    <?php $n += 1; } ?>

                </tbody>
            </table>

        </div>

        <button id="leaderboard-back-button" class="leaderboard-elem">Back</button>

    </body>
    <script>
        document.body.addEventListener ("click", () => {
            if (event.target.matches("#leaderboard-back-button"))
                window.location.pathname = '../index.html';
        });
    </script>
</html>
