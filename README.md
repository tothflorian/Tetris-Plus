# Tetris-Plus
SEE THE ENGLISH VERSION BELOW

JavaScript technikák:

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

# English version:

This is my first JavaScript project.

