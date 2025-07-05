import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { EstablishmentService } from './establishment.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';

@Controller('establishment')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Post()
  create(@Req() req: Request, @Body() dto: CreateEstablishmentDto) {
    const tenantId = (req as any).user?.tenantId;
    return this.establishmentService.create(tenantId, dto);
  }

  @Get()
  findAll(@Req() req: Request) {
    const tenantId = (req as any).user?.tenantId;
    return this.establishmentService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const tenantId = (req as any).user?.tenantId;
    return this.establishmentService.findOne(id, tenantId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() dto: UpdateEstablishmentDto,
  ) {
    const tenantId = (req as any).user?.tenantId;
    return this.establishmentService.update(id, tenantId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const tenantId = (req as any).user?.tenantId;
    return this.establishmentService.remove(id, tenantId);
  }
}