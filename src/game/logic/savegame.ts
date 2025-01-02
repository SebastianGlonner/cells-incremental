import { container, injectable, injectAll } from "tsyringe";

export interface SavegameHandler {
    savegame(): void;
}


@injectable()
class Foo implements SavegameHandler {
    savegame(): void {
        console.log('foo savegame');
    }
}

@injectable()
class Bar implements SavegameHandler {
    savegame(): void {
        console.log('bar savegame');
    }
}

@injectable()
class SavegameManager {
  constructor(@injectAll('SavegameHandler') private fooArray: SavegameHandler[]) {
  }

  doSaveGames() {
    
    this.fooArray.forEach(element => {
        element.savegame();
    });
  }
}

container.register('SavegameHandler', {
    useClass: Foo
});
// container.register('SavegameHandler', {
//     useClass: Bar
// });

export default container.resolve(SavegameManager);