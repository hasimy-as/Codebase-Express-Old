import { Application } from 'express';

export abstract class CommonRoutes {
    app: Application;
    name: string;

    constructor(app: Application, name: string) {
        this.app = app;
        this.name = name;
        this.routes();
    }

    getName() {
        return this.name;
    }

    abstract routes(): Application;
}