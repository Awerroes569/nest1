import { ClientsService } from './clients.service';
import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { CreateClientDTO } from './dtos/create-client.dto';
import { UpdateClientDTO } from './dtos/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get('/')
  getAll(): any {
    return this.clientsService.getAll();
  }

  @Get('/extended')
  getAllExtended(): any {
    return this.clientsService.getAllExtended();
  }

  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const ord = this.clientsService.getById(id);
    if (!ord) throw new NotFoundException('Client not found');
    return ord;
  }

  @Get('extended/:id')
  getByIdExtended(@Param('id', new ParseUUIDPipe()) id: string) {
    const ord = this.clientsService.getByIdExtended(id);
    if (!ord) throw new NotFoundException('Client not found');
    return ord;
  }

  @Delete('/:id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.clientsService.getById(id))
      throw new NotFoundException('Order not found');
    this.clientsService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() clientData: CreateClientDTO) {
    return this.clientsService.create(clientData);
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() clientData: UpdateClientDTO,
  ) {
    if (!this.clientsService.getById(id))
      throw new NotFoundException('Client not found');

    this.clientsService.updateById(id, clientData);
    return { success: true };
  }
}
