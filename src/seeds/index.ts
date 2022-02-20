import { Teacher } from '@/entities/teacher.entity';
import { School } from '@/entities/school.entity';
import { createConnection } from 'typeorm';

async function generateData() {
  const connection = await createConnection();
  const schoolRepository = connection.getRepository(School);
  const data = await schoolRepository.create({
    name: '清华大学',
    shortName: '清华',
    description: '全国名校'
  });
  const school = await schoolRepository.save(data);
  const teacherRepository = connection.getRepository(Teacher);
  const teacher = await teacherRepository.create({
    name: '刘丽春',
    mobile: '13585780795',
    cardNo: '362426199502202628',
    password: '123456',
    sex: 'female',
    schoolId: school.id
  });
  await teacherRepository.save(teacher);
}

generateData();

console.log('thihsi tyest');
