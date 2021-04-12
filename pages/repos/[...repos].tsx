import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import api from "../../services/api";
import { Header, RepositoryInfo, Issues } from '../../styles/Repository';
import Image from 'next/image'
import { useEffect, useState } from "react";

type IRepository = {
  full_name: string;
  description: string;
  stargazers_count?: number;
  forks_count?: number;
  open_issues_count?: number;
  owner: {
    login: string;
    avatar_url: string;
  }
}

interface IIssue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  }
}

export default function Repository({ repository }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const repo: IRepository = repository

  const [issues, setIssues] = useState<IIssue[]>([])

  useEffect(() => {
    async function loadDataIssue() {
      const response = await api.get<IIssue[]>(`/repos/${repo.full_name}/issues`)
      setIssues(response.data)
    }

    loadDataIssue()
  }, [])

  return (
    <>
      <Head>
        <title>{repo.full_name}</title>
      </Head>
      <Header>
        <Image
          src="/logo.svg"
          alt="Logotipo do GithubExplorer"
          width={200}
          height={50}
        />
        <Link href="/">
          <a>
            <FiChevronLeft size={16} />
            Voltar
          </a>
        </Link>
      </Header>

      {repo && (
        <RepositoryInfo>
          <header>
            <img
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
            />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repo.stargazers_count}</strong>
              <span>Starts</span>
            </li>
            <li>
              <strong>{repo.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repo.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const repos = ctx.req.url

  if (!repos) {
    return {
      notFound: true,
    }
  }

  try {
    const repository = await api.get(`${repos}`);
    const dataRepo: IRepository = repository.data

    return {
      props: {
        repository: dataRepo
      }
    }

  } catch (error) {
    return {
      notFound: true,
    }
  }
}
