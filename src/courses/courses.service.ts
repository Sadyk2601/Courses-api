import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './course.model';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { v4 as uuid } from 'uuid';
import { json } from 'stream/consumers';

@Injectable()
export class CoursesService {
  private courses: Course[] = [];

  findAll(query?: any): Course[] {
    let filtered = this.courses;
    if (query?.teacher) {
      filtered = filtered.filter((c) => c.teacherName.includes(query.teacher));
    }
    if (query?.price) {
      filtered = filtered.filter((c) => c.price == query.price);
    }
    return filtered;
  }

  findOne(id: string): Course {
    const course = this.courses.find((c) => c.id === id);
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  create(dto: CreateCourseDto): Course {
    const course = {
      id: uuid(),
      ...dto,
      isActive: dto.isActive ?? true,
    };
    this.courses.push(course);
    return course;
  }

  update(id: string, dto: UpdateCourseDto): Course {
    const course = this.findOne(id);
    Object.assign(course, dto);
    return course;
  }

  remove(id: string): void {
    const index = this.courses.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException('Course not found');
    this.courses.splice(index, 1);
  }
}
