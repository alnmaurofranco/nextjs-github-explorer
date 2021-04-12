import Head from "next/head";

interface LayoutProps {
  title: string;
}

const MainLayout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>GithubExplorer - {title}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <div>{children}</div>
    </>
  );
}

export default MainLayout;
