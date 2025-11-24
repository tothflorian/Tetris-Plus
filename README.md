# Tetris-Plus
SEE THE ENGLISH VERSION BELOW

Hogyan kell játszani:
-
A játék célja, hogy a leeső darabokat úgy helyezd el, hogy teljes vízszintes sorokat töltsenek ki.
A megtelt sorok eltűnnek, és pont jár értük. Minél több sor tűnik el egyszerre, annál több pont jár.
A játék akkor ér véget, ha az darabok elérik a pálya tetejét.

Irányítás:
  - A / D | Balra / Jobbra nyíl – az elem mozgatása adott irányba
  - W | Fel nyíl – az elem forgatása
  - S | Le nyíl – azonnali leejtés
  - Esc - Játék szüneteltetése

Pontozás:
  - 1 sor: 100 pts
  - 2 sor: 300 pts
  - 3 sor: 500 pts
  - Tetris (4 sor): 800 pts
Minden pontszerzés 5x szorzóval számolódik, hogyha a sor(okat) törlő darab arany.

JavaScript technikák:
-
- I. JavaScript nyelvi elemei | A projektben alapvető nyelvi elemeket használok, mint például:
  - let, const változó deklarálások,
  - szinkron és aszinkron metódusok/függvények,
  - for, while ciklusok,
  - if, switch elágazások,
  - valamint tömbök és objektumok (például a Tetris formájának és pozícióinak kezeléséhez).

- II. DOM programozás | Bizonyos HTML elemeket a JavaScript segítségével kezelem:
  - A játékteret és a menüket a document.querySelector() és querySelectorAll() függvény hívásokkal érem el.
  - A pontszám, szint és üzenetek megjelenítése dinamikusan frissül a DOM-ban (innerText, innerHTML).

- III. Eseménykezelés részletei | Billentyűzettel vezérelhető a játék:
  - A keydown esemény figyeli a nyilakat és a szóközt, így a játékos tudja forgatni, mozgatni vagy gyorsítani az elemeket.
  - Az onclick esemény több interaktív elem (pl. gombok) ehhez az eseménytípushoz kötöttek (pl. játék indítása, újraindítás gombnyomásra).
  - A gameOver esemény (CustomEvent) akkor hívódik meg a programban (dispatchEvent), amikor a játék végéhez szükséges feltétel teljesül.

- IV. Kódszervezés, adatok tárolása | A kód modulokra van bontva:
  - tetrisGameLogic.js tartalmazza a játék fő logikáját, a pálya és az elemek frissítését.
  - tetrisGamePiece.js definiálja az elemek alakját és mozgását objektumorientált megközelítéssel.
  - tetrisMenu.js kezeli a menürendszert és a hozzá kapcsolódó eseményeket.
  - tetrisGameAudio.js felel a hangzásért.
  - Az adatok tömbökben és objektumokban tárolódnak (pl. mátrix a játéktérhez, egyedi (Piece) objektum az aktív Tetris-darabhoz).

- V. Űrlapok, képek, táblázatok | A játék menüjében és UI-jában egyszerű HTML-elemek szerepelnek, például:
  - gombok, feliratok,
  - egy játék logó a menükben,
  - képes háttér bizonyos elemeknek.

- VI. JavaScript beépített objektumai
  - Math: Tetris-darab véletlenszerű generálásához (Math.random() és Math.floor()),
  - Audio: a hanghatások betöltéséhez és lejátszásához.

- VII. Canvas, animációk, API-k | A játék a Canvas API-t használja a játéktér kirajzolására:
  - A canvas.getContext("2d") segítségével a megjelenítés 2D-s.
  - A játék fő logikai mozgatórugója a gameLoop() ciklusában zajlik, ami a requestAnimationFrame() callback függvényeként aszinkron módon generálja a képkockákat.
  - A rajzolási folyamat minden képkockánál törli és újrarajzolja a pályát, biztosítva a sima mozgást. Ilyen volumenű játéknál még ez szinte triviális terhelés.

PHP technikák:
-
- I. Adatbázis
  - A PHP funkciók adathalmazának alapjául szolgáló platform a MySQL, amivel kapcsolatban áll a backend, függ tőle.
  - A két megközelítés közül (PDO - többféle adatbázishoz, mysqli - MySQL) a mysqli-t választottam a projektemhez, mivel ez MySQL adatbázis esetén gyorsabban működik, mint a PDO-s megoldás.
- II. User login rendszer
  - A felhasználó tud saját fiókot regisztrálni, abba bejelentkezni és tetszés szerint kijelentkezni is.
  - Ez a funkció session segítségével valósul meg. 
- III. Eredménytábla
  - A felhasználó eredményei felkerülnek az eredménytáblába, amennyiben nincsen bejelentkezve, automatikusan Vendég (Guest) néven rögzíti az elért eredményt.
  - Több segédfüggvény a fetch() függvény használatával összekötik a frontend-et a backend-del.
  - A játéklogika (tetrisGameLogic.js) gameOver eseménye feltölti az elért eredményt és a hozzá tartozó felhasználót az adatbázisba.
  - A főoldal (index.php) leaderboard részén a tábla PHP kóddal kéri le az adatbázisból a már rögzített eredményeket, majd jeleníti meg egy dinamikus méretű táblában.

# English version:

This is my first JavaScript project.

How to Play:
-
The goal of the game is to place the falling pieces so that they fill complete horizontal rows.
Filled rows disappear, you earn points for them. The more rows you clear at once, the more points you get.
The game is over when the pieces reach the top of the field.

Controls:
  - A / D | Left / Right arrow – move the piece in the given direction
  - W | Up arrow – rotates the piece
  - S | Down arrow – instant drop
  - Esc - Pause the game

Scoring:
  - 1 line: 100 pts
  - 2 lines: 300 pts
  - 3 lines: 500 pts
  - Tetris (4 lines): 800 pts
Each score is multiplied by 5x if the piece that clears the line(s) is golden.

JavaScript techniques:
-
- I. Elements of the JavaScript language | The project uses basic language elements such as:
  - let, const variable declarations,
  - synchronous and asynchronous methods/functions,
  - for, while loops,
  - if, switch conditions,
  - as well as arrays and objects (for handling Tetris shapes and positions).

- II. DOM programming | Certain HTML elements are handled via JavaScript:
  - The game field and menus are accessed using document.querySelector() and querySelectorAll() function calls.
  - Score, level, and messages are dynamically updated in the DOM (innerText, innerHTML).

- III. Event handling details | The game is controlled by keyboard:
  - The keydown event listens for arrows and spacebar, allowing the player to rotate, move, or speed up pieces.
  - The onclick event is assigned to several interactive elements (e.g., buttons) for actions such as starting or restarting the game.
  - The gameOver event (CustomEvent) is triggered in the program (dispatchEvent) when the condition for ending the game is met.

- IV. Code organization, data storage | The code is divided into modules:
  - tetrisGameLogic.js contains the main game logic and field/piece updates.
  - tetrisGamePiece.js defines piece shapes and movement using an object-oriented approach.
  - tetrisMenu.js manages the menu system and related events.
  - tetrisGameAudio.js handles the sounds.
  - Data is stored in arrays and objects (e.g., a matrix for the game field, a unique (Piece) object for the active Tetris piece).

- V. Forms, images, tables | The game’s menu and UI contain simple HTML elements such as:
  - buttons, labels,
  - a game logo in the menus,
  - image backgrounds for certain elements.

- VI. JavaScript built-in objects
  - Math: for random Tetris piece generation (Math.random() and Math.floor()),
  - Audio: for loading and playing sound effects.

- VII. Canvas, animations, APIs | The game uses the Canvas API to render the playing field:
  - Rendering is 2D using canvas.getContext("2d").
  - The game’s main logical engine runs in the gameLoop() cycle, which asynchronously generates frames via requestAnimationFrame() callbacks.
  - Each frame clears and redraws the field to ensure smooth motion. For a game of this scale, the load is practically trivial.

PHP techniques:
-
- I. Database
  - The PHP mechanics using data in this project are relying on MySQL, which depends on the backend it's connected to.
  - From the two options (PDO - for a variety of databases, mysqli - MySQL) I chose mysqli for my project, as it works faster when it comes to MySQL database, than the PDO version.
- II. User login system
  - The user can register their own account, log in and log out at will.
  - This mechanic uses sessions. 
- III. Leaderboard
  - The users scores are uploaded to the database. If they aren't logged in, the score uploads with the Guest username by default.
  - Several auxiliary functions are connecting the frontend and the backend using the fetch() function.
  - The gameOver event inside game logic (tetrisGameLogic.js) uploads the user and their score to the database.
  - At the leaderboard menupoint the table uses PHP code to fetch the records data, then lists them in this dynamic table.
