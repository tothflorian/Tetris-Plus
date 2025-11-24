<!DOCTYPE html>
<html lang="en">

<head>
    <title>Tetris</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./style.css">
    <link rel="icon" type="image/x-icon" href="resources/favicon.ico">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npt/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body>

    <div id="ui" class ="ui">
        <h4 id="ui-difficulty">Difficulty: MEDIUM</h4>

        <div class="volume-control">
            <label for="volume-range">Volume:</label>
            <input type="range" id="volume-range" min="0" max="1" step="0.01" value="0.5">
            <button id="music-pause-button">▶️</button>
        </div>

        <div class="ui-div">
            <h4>Username:</h4>
            <h4 id="ui-username">Guest</h4>
        </div>

        <button id="ui-login-button">Login</button>
        <button id="ui-logout-button">Logout</button>

    </div>

    <div id="main-menu" class="tab menu">
        <img src="resources/tetris-plus-logo.png" class="tetris-logo" alt="Tetris logo">
        <h4 id="previous-score">Previous score: NONE</h4>
        <button id="new-game-button">New Game</button>
        <button id="difficulty-button">Difficulty</button>
        <button id="leaderboard-button">Leaderboard</button>
    </div>

    <div id="pause-menu" class="tab menu">
        <h1>PAUSE</h1>
        <img src="resources/tetris-plus-logo.png" class="tetris-logo" alt="Tetris logo">
        <button id="pause-resume-button">Resume</button>
        <button id="pause-quit-button" class="back-button">Quit</button>
    </div>

    <div id="difficulty-menu" class="tab menu">
        <h1>DIFFICULTY</h1>
        <button id="easy-button">Easy</button>
        <button id="medium-button">Medium</button>
        <button id="hard-button">Hard</button>
        <button class="back-button">Back</button>
    </div>

    <div id="game" class="tab">
        <p id="score" style="margin-bottom: 4%">Score: 0</p>
        <canvas id="map" height="640" width="320"></canvas>
        <div id="next-container">
            <div id="next-label">Next piece</div>
            <canvas id="next-piece"></canvas>
            <div>Esc to pause game...</div>
        </div>
    </div>

    <div id="leaderboard-menu" class="tab menu container mt-3">

        <div class="leaderboard-content">

            <h1>LEADERBOARD</h1>

            <div class="table-container">
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

            <button class="back-button">Back</button>

        </div>

    </div>

    <div id="login-menu" class="tab menu">
        <h1>LOGIN</h1>

        <form method="post" id="login-form" action="backend/auth/login.php">

            <div>
                <label for="login-username">Username</label>
                <input type="text" id="login-username" name="username" placeholder="Enter your name">
            </div>

            <div>
                <label for="login-password">Password</label>
                <input type="password" id="login-password" name="password" placeholder="Enter your password">
            </div>

            <a id="login-to-register">Don't have an account yet? Click here to register!</a>
            <button type="submit" id="login-button">Login</button>

        </form>

        <button class="back-button">Back</button>

    </div>

    <div id="register-menu" class="tab menu">
        <h1>REGISTER</h1>

        <form method="post" id="register-form" action="backend/auth/register.php">

            <div>
                <label for="register-username">Username</label>
                <input type="text" id="register-username" name="username" placeholder="Ig. FentanylAbuser96">
            </div>

            <div>
                <label for="register-password">Password</label>
                <input type="password" id="register-password" name="password" placeholder="Ig. StronGPassWoRd213">
            </div>

            <div>
                <label for="register-repeat-password">Repeat password</label>
                <input type="password" id="register-repeat-password" name="repeat-password" placeholder="Ig. Same as the previous box...">
            </div>

            <a id="register-to-login">I already have an account</a>
            <button type="submit" id="register-button">Register</button>

        </form>

        <button class="back-button">Back</button>

    </div>

</body>
<script src="frontend/tetrisMenu.js"></script>
<script src="frontend/tetrisUserLogin.js"></script>
<script src="frontend/tetrisGamePiece.js"></script>
<script src="frontend/tetrisGameLogic.js"></script>
<script src="frontend/tetrisGameAudio.js"></script>
</html>