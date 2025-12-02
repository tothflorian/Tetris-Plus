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
- I. PHP Elemek | A projekt több alapvető PHP-elemre épül:
  - változók, tömbök, asszociatív tömbök használata ($_POST, $_FILES, adatbázis sorok)
  - feltételes szerkezetek (if, else)
  - vezérlési szerkezetek, ciklusok (adatfeldolgozásnál)
  - require szerkezet a kódszervezéshez.

- II. PHP függvények használata | A kódban számos beépített és saját függvény jelenik meg:
  - szövegkezelő függvények: trim(), password_hash(), password_verify()
  - tömbkezelés: isset(), empty(), array típusok
  - dátum/idő: szerver oldalon logokhoz, session lejáratokhoz
  - saját logikai függvények adatbázis-kapcsolatra és hitelesítésre.

- III. Objektumorientált programozás (OOP) | Kapcsolatteremtés az adatbázissal:
  - A PHP funkciók adathalmazának alapjául szolgáló platform a MySQL, amivel kapcsolatban áll a backend, függ tőle.
  - A két megközelítés közül (PDO - többféle adatbázishoz, mysqli - MySQL) a mysqli-t választottam a projektemhez, mivel ez MySQL adatbázis esetén gyorsabban működik, mint a PDO-s megoldás.

- IV. Kimenet generálása PHP-vel | JSON objektumok:
  - A backend több helyen JSON-t generál válaszként (echo json_encode(...))
  - hibaüzeneteket ad vissza AJAX hívások számára
  - HTML-t nem közvetlenül a PHP állít elő, mert a frontend külön van választva – modern fejlesztési szemlélet.

- V. Környezeti adatok használata:
  - .env fájlt (config.env) konfigurációkhoz
  - A biztonságos adatbázis-kapcsolat érdekében.

- VI. Űrlapkezelés, validálás és adatok feldolgozása
  - A hitelesítési űrlapok backendje ellenőrzi, hogy a mezők ki vannak-e töltve,
    - jelszót hashel (password_hash)
    - adatot olvas POST-ból ($_POST)
    - hibákat küld vissza JSON-ban a frontendnek.

- VII. Adattárolás – adatbázis használata
  - Kapcsolatteremtés mysqli használatával (lásd: PHP Technikák III.)
  - A projekt adatbázist használ, amelyhez:
    - prepared statement-eket használsz (SQL injection elleni védelem)
    - adatokat mentesz: felhasználók, pontszámok
    - adatokat olvasol: login ellenőrzés, user ID lekérése.
  - Eredménytábla
    - A felhasználó eredményei felkerülnek az eredménytáblába, amennyiben nincsen bejelentkezve, automatikusan Vendég (Guest) néven rögzíti az elért eredményt.
    - Több segédfüggvény a fetch() függvény használatával összekötik a frontend-et a backend-del.
    - A játéklogika (tetrisGameLogic.js) gameOver eseménye feltölti az elért eredményt és a hozzá tartozó felhasználót az adatbázisba.
    - A főoldal (index.php) leaderboard részén a tábla PHP kóddal kéri le az adatbázisból a már rögzített eredményeket, majd jeleníti meg egy dinamikus méretű táblában.

- VIII. Munkamenet kezelés (session)
  - A session.php kezeli:
    - session indítása: session_start()
    - session változók tárolása (pl. user azonosító)
    - session ellenőrzése bejelentkezéskor
    - Logoutnál session törlés történik.

- IX. Hitelesítés
  - A felhasználó tud saját fiókot regisztrálni, abba bejelentkezni és tetszés szerint kijelentkezni is.
  - Ez a funkció session segítségével valósul meg.

- X. Kódszervezés (logikai és fizikai) | A projekt példásan strukturált:
  - Backend és frontend teljes szétválasztása
  - Backend logikai részei külön fájlokba bontva
  - környezeti adatok külön .env fájlban
  - többször használható részek: db.php, session.php

- XI. Aszinkron kiszolgálás (AJAX / fetch API)
  - A frontend JavaScript fájlok (tetrisUserLogin.js)
  - AJAX kérdéseket küldenek PHP-nek, amely JSON-t küld vissza.
  - Ez modern, aszinkron szerver-oldali kommunikáció.

- XII. Hibakezelés
  - Több helyen try catch használata, ahol a PHP kódtól független erőforrások (pl. adatbázis) vannak használva.

- XIII. Tesztelés | A projekt több ponton manuálisan tesztelhető:
  - Auth műveletek POST-tal
  - Fetch-alapú AJAX válaszok ellenőrzése böngésző konzolban
  - Automatizált PHP unit teszt nincs, de a struktúra erre alkalmas lenne.

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

PHP Techniques:
-
- I. PHP Elements | The project is built upon several fundamental PHP elements:
  - use of variables, arrays, associative arrays ($_POST, $_FILES, database rows)
  - conditional structures (if, else)
  - control structures, loops (for data processing)
  - use of include/require for code organization

- II. Use of PHP Functions | The code makes use of many built-in and custom functions:
  - string handling functions: trim(), password_hash(), password_verify()
  - array handling: isset(), empty(), array types
  - date/time: for server-side logs and session expirations
  - custom logic functions for database connection and authentication.

- III. Object-Oriented Programming (OOP) | Database Integration:
  - The backend depends on MySQL, which serves as the platform for the PHP functionality and data handling.
  - Between the two approaches (PDO – for multiple database types, mysqli – for MySQL), I chose mysqli for this project, as it performs faster than PDO when using a MySQL database.

- IV. Output Generation with PHP | JSON Objects:
  - The backend generates JSON responses in multiple places (echo json_encode(…))
  - returns error messages for AJAX calls
  - HTML is not generated directly by PHP, since the frontend is separated — a modern development approach.

- V. Use of Environment Variables:
  - .env file (config.env) for configuration
  - Ensures secure database connection settings.

- VI. Form Handling, Validation, and Data Processing
  - The backend for authentication forms checks whether fields are filled,
    - hashes passwords (password_hash)
    - reads data from POST ($_POST)
    - returns errors in JSON format to the frontend.

- VII. Data Storage – Database Usage
  - Connecting via mysqli (see PHP Techniques III.)
  - The project uses a database where:
    - prepared statements are used (protection against SQL injection)
    - data is stored: users, scores
    - data is retrieved: login verification, fetching user ID
  - Leaderboard
    - User results are added to the leaderboard; if the user is not logged in, the result is stored automatically under the name “Guest”.
    - Several helper functions using fetch() connect the frontend and backend.
    - The game logic (tetrisGameLogic.js) triggers a gameOver event that uploads the score and associated user to the database.
    - On the main page (index.php), the leaderboard section retrieves saved results using PHP and displays them in a dynamically sized table.

- VIII. Session Management
  - session.php handles:
    - session start: session_start()
    - storing session variables (e.g., user ID)
    - session validation during login
    - clearing session on logout.

- IX. Authentication
  - Users can register their own accounts, log in, and log out at will.
  - This feature is implemented using sessions.

- X. Code Organization (Logical and Physical) | The project is well-structured:
  - Complete separation of backend and frontend
  - Backend logic split into separate files
  - environment data stored in a separate .env file
  - reusable components: db.php, session.php

- XI. Asynchronous Communication (AJAX / Fetch API)
  - Frontend JavaScript files (tetrisUserLogin.js)
  - Sends AJAX requests to PHP, which returns JSON responses.
  - This ensures modern, asynchronous server-side communication.

- XII. Error Handling
  - try–catch blocks are used in several places where resources independent from PHP code (e.g., the database) are involved.

- XIII. Testing | The project can be manually tested at several points:
  - authentication operations with POST
  - checking fetch-based AJAX responses in the browser console
  - No automated PHP unit tests are included, but the structure is suitable for them.
