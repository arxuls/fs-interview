import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DispatchesModule } from "./dispatches/dispatches.module";

@Module({
  imports: [DispatchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
