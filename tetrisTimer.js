class tetrisAsyncTimer {
    constructor(interval) {
        this.interval = interval;
        this.running = false;
    }

    async start(callback) {
        if (this.running)
            return;

        this.running = true;

        while (this.running) {
            const start = Date.now();

            await callback();

            const elapsed = Date.now() - start;
            const delay = Math.max(0, this.interval - elapsed);

            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    stop() {
        this.running = false;
    }
}