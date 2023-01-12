import { Injectable } from "@angular/core";
import { StructureType, STRUCTURE_TYPES } from "./game.data";
import { InitPlayer, Player } from "./player.model";

export enum Actions {
  EndTurn,
  BuildRoad,
  BuildOutpost,
  BuildCity,
  BuildCapitol,
  BuildMonument,
}

export const structureBuildMap: Record<
  Exclude<Actions, Actions.EndTurn>,
  StructureType
> = {
  [Actions.BuildCapitol]: STRUCTURE_TYPES.capitol,
  [Actions.BuildCity]: STRUCTURE_TYPES.city,
  [Actions.BuildOutpost]: STRUCTURE_TYPES.outpost,
  [Actions.BuildRoad]: STRUCTURE_TYPES.road,
  [Actions.BuildMonument]: STRUCTURE_TYPES.monument,
};

@Injectable()
export class GameService {
  public gameRound: number = 0;
  public players: Player[] = [];
  public currentPlayerTurn: number = 0;

  // constructor() {}

  public init(): void {}
  public end(player: Player): boolean {
    return confirm(
      `${player.name} sets claim on the island and wins the game!\nPlay a new Game?`
    );
  }

  public giveStartingResources() {
    this.players.forEach((player) => {
      player.stats.resourceCount = {
        food: 5,
        gold: 5,
        stone: 10,
        wood: 5,
        influence: 20,
      };
    });
  }

  public resetPlayers(count: InitPlayer[]): void {
    this.players = count.map(
      (p: InitPlayer, i: number): Player => new Player(p.name, p.color, i)
    );
    this.giveStartingResources();
  }

  public getCurrentPlayer(): Player {
    return this.players[this.currentPlayerTurn];
  }

  public getRandomStartPlayer(): Player {
    this.currentPlayerTurn = Math.floor(Math.random() * this.players.length);
    return this.getCurrentPlayer();
  }

  private addPlayer(player: Player): void {
    this.players.push(player);
  }

  public setNextPLayerTurn(): Player {
    this.currentPlayerTurn += 1;
    if (this.currentPlayerTurn >= this.players.length) {
      this.currentPlayerTurn = 0;
      this.gameRound++;
    }
    const currentPlayer = this.getCurrentPlayer();
    if (this.gameRound > 0) {
      currentPlayer.updateProduction();
    }
    return currentPlayer;
  }

  public getCurrentPlayerActions(): Actions[] {
    return [Actions.BuildRoad];
  }
}
