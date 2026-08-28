import { contract } from "@interview-kit/api/index";
import { Controller, Inject } from "@nestjs/common";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";

import { DispatchesService } from "./dispatches.service";

@Controller()
export class DispatchesController {
  constructor(
    @Inject(DispatchesService)
    private readonly dispatchesService: DispatchesService,
  ) {}

  @TsRestHandler(contract.dispatches)
  handler() {
    return tsRestHandler(contract.dispatches, {
      list: async () => {
        const dispatches = await this.dispatchesService.findAll();
        return { status: 200, body: dispatches };
      },
      update: async ({ params, body }) => {
        const dispatch = await this.dispatchesService.update(params.id, body);
        if (!dispatch) {
          return {
            status: 404,
            body: { message: `Dispatch ${params.id} not found` },
          };
        }
        return { status: 200, body: dispatch };
      },
    });
  }
}
