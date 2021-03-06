import FakeUserRepository from '@modules/user/repository/fakes/FakeUserRepository';
import CreateUserService from '@modules/user/service/CreateUserService';
import AppError from '@shared/error/AppError';
import FakeHashProvider from '@modules/user/providers/hashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserRepository from '../repository/IUserRepository';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';

let fakeUserRepository: IUserRepository;
let fakeHashProvider: IHashProvider;
let fakeCacheProvider: ICacheProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Teste da Silva',
      email: 'teste@teste.com',
      password: 'teste',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Teste da Silva');
    expect(user.email).toBe('teste@teste.com');
  });
  it('should not be able to create a new user with an email that is already in use', async () => {
    await createUserService.execute({
      name: 'Teste da Silva',
      email: 'teste@teste.com',
      password: 'teste',
    });

    await expect(
      createUserService.execute({
        name: 'Teste da Silva',
        email: 'teste@teste.com',
        password: 'teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
