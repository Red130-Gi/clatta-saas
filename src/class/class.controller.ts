import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ClassService } from './class.service';
import { Request } from 'express';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Req() req: Request, @Body() createClassDto: CreateClassDto) {
    const tenantId = (req as any).user?.tenantId;
    return this.classService.create(tenantId, createClassDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    const tenantId = (req as any).user?.tenantId;
    return this.classService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const tenantId = (req as any).user?.tenantId;
    return this.classService.findOne(id, tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Req() req: Request, @Body() updateClassDto: UpdateClassDto) {
    const tenantId = (req as any).user?.tenantId;
    return this.classService.update(id, tenantId, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const tenantId = (req as any).user?.tenantId;
    return this.classService.remove(id, tenantId);
  }
}
