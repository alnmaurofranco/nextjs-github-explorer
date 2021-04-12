import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import MainLayout from "../layout/MainLayout";
import { Title, Form, Repositories, Error } from '../styles/Home'
import { FiChevronRight } from 'react-icons/fi'
import api from '../services/api';

interface IRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

export default function Home() {
  const [newRepo, setNewRepo] = useState('')
  const [inputError, setInputError] = useState('')
  const [repositories, setRepositories] = useState<IRepository[]>(() => {
    if (process.browser) {
      const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories')

      if (storagedRepositories) {
        return JSON.parse(storagedRepositories)
      }

      return [];
    }
  })

  async function handleAddRepository(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get<IRepository>(`/repos/${newRepo}`)
      const repository = response.data
      setRepositories([...repositories, repository])
      setNewRepo('')
      setInputError('')
    } catch (err) {
      setInputError('Erro na busca por esse repositório')
    }
  }

  useEffect(() => {
    if (process.browser) {
      localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories))
    }
  }, [repositories])

  return (
    <MainLayout title="Home">
      <Image
        src="/logo.svg"
        alt="Logotipo do GithubExplorer"
        width={200}
        height={50}
      />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório do github..."
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories && repositories.map(repos => (
          <Link href={`/repos/${repos.full_name}`} key={repos.full_name}>
            <a>
              <Image
                src={repos.owner.avatar_url}
                alt={repos.owner.login}
                width={64}
                height={64}
              />
              <div>
                <strong>{repos.full_name}</strong>
                <p>{repos.description}</p>
              </div>

              <FiChevronRight size={20} />
            </a>
          </Link>
        ))}
      </Repositories>
    </MainLayout>
  )
}
