import {SimpleGrid} from '@mantine/core';
import MyCard from "@/app/components/MyCard";

type BlockCardsProps = {
  cards: {
    id: number;
    original_title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
  }[];
}

const BlockCards = ({cards}: BlockCardsProps) => {
  return (
    <SimpleGrid
      cols={2}
      spacing="16px"
      w="100%"
      classNames={{root:"blockCards"}}
    >
      {cards.map((movie) =>
        <MyCard
          bigCard={false}
          key={movie.id}
          id={movie.id}
          original_title={movie.original_title}
          poster_path={movie.poster_path}
          release_date={movie.release_date}
          vote_average={movie.vote_average}
          vote_count={movie.vote_count}
          genre_ids={movie.genre_ids}
        />)}
    </SimpleGrid>
  )
};
export default BlockCards;