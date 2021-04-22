import Link from 'next/link';

import s from './Film.module.scss';

type Props = {
  title: string;
  openingCrawl: string;
  episodeID: string;
  characters: object;
};

export function Film({ title, openingCrawl, episodeID, characters }: Props): JSX.Element {
  return (
    <section className={s.film}>
      <h2 className={s.film__title}>
        Episode {episodeID}: {title}
      </h2>
      <div className="display__flex">
        <div className="description">
          <p>
            {openingCrawl}
          </p>
        </div>
        <div className="characters">
          <h3>
            Characters
         </h3>

        </div>
      </div>
    </section>
  );
}

