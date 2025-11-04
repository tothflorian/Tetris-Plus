# Tetris-Plus
SEE THE ENGLISH VERSION BELOW

JavaScript technikák:

- I. JavaScript nyelvi elemei: A projektben alapvető nyelvi elemeket használok, mint például:
  - let, const változó deklarálások,
  - metódusok/függvények,
  - for, while ciklusok,
  - if, switch elágazások,
  - valamint tömbök és objektumok (például a Tetris formájának és pozícióinak kezeléséhez).

- II. DOM programozás:
Bizonyos HTML elemeket a JavaScript segítségével kezelem:
  - A játékteret és a menüket a document.querySelector() és querySelectorAll() függvény hívásokkal érem el.
  - A pontszám, szint és üzenetek megjelenítése dinamikusan frissül a DOM-ban (innerText, innerHTML).

- III. Eseménykezelés részletei
Billentyűzetes vezérlést használok a játék irányításához:

A keydown esemény figyeli a nyilakat és a szóközt, így a játékos tudja forgatni, mozgatni vagy gyorsítani az elemeket.

Az onclick esemény a menü gombjait kezeli (pl. játék indítása, újraindítás).

- IV. Kódszervezés, adatok tárolása
A kód modulokra van bontva:

tetrisGameLogic.js tartalmazza a játék fő logikáját, a pálya és az elemek frissítését.

tetrisGamePiece.js definiálja az elemek alakját és mozgását objektumorientált megközelítéssel.

tetrisMenu.js kezeli a menürendszert és az eseményeket.

tetrisGameAudio.js a hanghatásokat kezeli, külön objektumokban tárolva az audiókat.

Az adatok tömbökben és objektumokban tárolódnak (pl. mátrix a játéktérhez, egyedi objektum az aktív Tetris-elemhez).

- V. Űrlapok, képek, táblázatok
A játék menüjében és UI-jában egyszerű HTML-elemek szerepelnek, például gombok és feliratok. Az űrlapkezelés nem központi eleme a játéknak, viszont a DOM-ban több interaktív elem (pl. start gomb) eseményhez kötött.

- VI. JavaScript beépített objektumai

Math objektum: véletlenszerű Tetris-elem kiválasztásához (Math.random() és Math.floor()).

Date: a játékmenet időzítéséhez és sebességszámításhoz.

Audio: a hanghatások betöltéséhez és lejátszásához.

- VII. Canvas, animációk, API-k
A játék a Canvas API-t használja a játéktér kirajzolására:

A canvas.getContext("2d") segítségével 2D-s megjelenítés történik.

Az elemek frissítése és mozgatása animációs ciklusban zajlik (requestAnimationFrame).

A rajzolási folyamat minden képkockánál törli és újrarajzolja a pályát, biztosítva a sima mozgást.

# English version:

This is my first JavaScript project.

