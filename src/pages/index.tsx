import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { Film } from '../components/film/Film';

import { Layout } from '../components/layout/Layout';
import { characterFragment } from '../graphql/characterFragment';
import { fetchSwapi } from '../lib/swapi';
//import { IFilm } from '../types';

export type PageProps = {
  films: Array<any> | null;
};

export default function PageComponent(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  const { films } = data;
  console.log(films[0].characterConnection.characters);

  if (!films) {
    return (<p>error</p>);
  }

  return (
    <Layout>
      <Head>
        <title>Star Wars films</title>
      </Head>
      <h1>Star Wars films</h1>
      {films.map((film, i) => (
        <Film 
          key={i} 
          title={film.title} 
          openingCrawl={film.openingCrawl} 
          episodeID={film.episodeID}
          characters={film.characterConnection.characters}
        />
      ))}
    </Layout>
  );
}

const query = `
  query {
    allFilms {
      films {
        title
        openingCrawl
        episodeID
        characterConnection {
          characters {
            name
            id
          }
        }
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const films = await fetchSwapi<any>(query); // TODO EKKI any
  return {
    props: {
      films: films?.allFilms?.films ?? null,
    },
  };
};
