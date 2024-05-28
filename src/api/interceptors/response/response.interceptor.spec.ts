import { Courses } from '@api/courses/dto/courses.entity';
import { ResponseInterceptor } from './response.interceptor';

describe('ResponseInterceptor', () => {
  it('should be defined', () => {
    expect(new ResponseInterceptor(Courses)).toBeDefined();
  });
});
