import { Test, TestingModule } from '@nestjs/testing';
import { HashtagCrudService } from './hashtag-crud.service';

describe('HashtagCrudService', () => {
  let service: HashtagCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashtagCrudService],
    }).compile();

    service = module.get<HashtagCrudService>(HashtagCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
