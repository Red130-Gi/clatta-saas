import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { StudentService } from './student.service';
import { Request } from 'express';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Req() req: Request, @Body() createStudentDto: CreateStudentDto) {
    const tenantId = (req as any).user?.tenantId;
    return this.studentService.create(tenantId, createStudentDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    const tenantId = (req as any).user?.tenantId;
    return this.studentService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const tenantId = (req as any).user?.tenantId;
    return this.studentService.findOne(id, tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Req() req: Request, @Body() updateStudentDto: UpdateStudentDto) {
    const tenantId = (req as any).user?.tenantId;
    return this.studentService.update(id, tenantId, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const tenantId = (req as any).user?.tenantId;
    return this.studentService.remove(id, tenantId);
  }
}
