import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Req() req: Request, @Body() createUserDto: CreateUserDto) {
    const tenantId = (req as any).user?.tenantId;
    return this.userService.create(tenantId, createUserDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    const tenantId = (req as any).user?.tenantId;
    return this.userService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const tenantId = (req as any).user?.tenantId;
    return this.userService.findOne(id, tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const tenantId = (req as any).user?.tenantId;
    return this.userService.update(id, tenantId, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const tenantId = (req as any).user?.tenantId;
    return this.userService.remove(id, tenantId);
  }
}
