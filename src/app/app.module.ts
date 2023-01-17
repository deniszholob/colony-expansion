import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { FooterModule } from "./components/footer/footer.module";
import { GameService } from "./game/game.service";
import { GameModule } from "./views/game/game.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FooterModule, GameModule],
  providers: [GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
