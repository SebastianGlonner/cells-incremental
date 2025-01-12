export type ClassCtorAny = { new(...args: any[]): any };
export type ClassCtorEmpty = { new(): any };

export default new class Container {
    types = new Map<Class, any>();

    registerNew(clazz: ClassCtorEmpty) {
        const instance = new clazz();
        this.types.set(clazz.name, instance);
        return instance;
    }

    registerInstance(clazz: ClassCtorAny, instance?: any) {
        this.types.set(clazz.name, instance);
        return instance;
    }

    resolve<T>(clazz: { new(...args: any[]): T }): T {
        const instance = this.types.get(clazz.name);
        if (!instance) {
            throw 'can not resolve: ' + clazz.name;
        }
        return instance;
    }

    resolveName<T>(name: string): T {
        const instance = this.types.get(name);
        if (!instance) {
            throw 'can not resolve: ' + name;
        }
        return instance;
    }
}
