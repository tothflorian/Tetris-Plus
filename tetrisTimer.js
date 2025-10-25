async function lotOfDelays() {
    try {
        await delay(500);
        await delay(2000);
        const ms = await delay(800);
        console.log("Finally", ms);
    } catch {
        console.log("There are some errors")
    }
}

lotOfDelays();

function asd() {
    console.log("asd")
}

asd();