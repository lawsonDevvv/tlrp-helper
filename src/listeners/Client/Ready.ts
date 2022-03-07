import { Listener } from "@sapphire/framework";

export default class extends Listener {
    run(): void {
        this.container.logger.info("Ayo the login here.")
    }
}