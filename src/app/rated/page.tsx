"use client";
import {Flex, SimpleGrid, Text, Input, Button, ThemeIcon, Image} from '@mantine/core';
import BlockCards from "@/app/components/BlockCards";
import MyPagination from "@/app/components/MyPagination";
import {useEffect, useState} from "react";
import {useAppSelector} from "@/app/store/hooks";
import RatedEmpty from "@/app/components/RatedEmpty";

type DataMovie = {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}[];

const Page = () => {
  const isModal = useAppSelector(state => state.movie.isModal);
  const [allRatedMovies, setAllRatedMovies] = useState<DataMovie>([{
    id: 0, original_title: "",
    poster_path: "",
    release_date: "",
    vote_average: 0,
    vote_count: 0,
    genre_ids: [0]
  }]);
  const [value, setValue] = useState("");
  const countMovie = 2;
  const [pageRated, setPageRated] = useState(1);
  const pages = Math.ceil(allRatedMovies.length / countMovie);
  const movieRating = allRatedMovies.filter((_, index) => (index >= countMovie * (pageRated - 1)) && (index < countMovie * pageRated));

  useEffect(() => {
    const dataLocal = localStorage.getItem("rating");
    if (dataLocal) {
      setAllRatedMovies(JSON.parse(dataLocal));
    }
    if (pages < pageRated) {
      setPageRated(pages);
    }
    if (pages === 0) {
      setPageRated(1);
    }
  }, [isModal]);

  const choseMovie = () => {
    const dataLocal = localStorage.getItem("rating");
    if (dataLocal) {
      const dataMovie = JSON.parse(dataLocal) as DataMovie;
      setAllRatedMovies(dataMovie.filter(movie => {
        const movieName = movie.original_title.toLowerCase();
        const userValue = value.toLowerCase();
        if (movieName.includes(userValue)) {
          return movie;
        }
      }));
    }
  };

  return (<>
      {pages !== 0 && <Flex direction="column" gap="40px">
        <SimpleGrid
          cols={2}
          w="100%"
          styles={{root: {}}}
          classNames={{root: "ratedTitleBlock"}}
        >
          <Text size="32px" w="220px" fw={700} c="var(--black)" lh="44px">Rated movies</Text>
          <Input
            size="lg"
            pointer={true}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            rightSectionPointerEvents="all"
            rightSectionWidth="auto"
            placeholder="Search movie title"
            classNames={{
              input: "searchInput"
            }}
            leftSection={<ThemeIcon variant="white">
              <Image src="./loupe.svg" alt="loupe"/>
            </ThemeIcon>}
            rightSection={
              <Button
                h="32px"
                p="6px 20px"
                radius="8px"
                color="var(--purple_500_main)"
                styles={{
                  root: {right: "10px", zIndex: 100},
                  label: {fontSize: "14px"}
                }}
                onClick={choseMovie}
              >Search</Button>
            }/>
        </SimpleGrid>
        <Flex direction="column" gap="24px" align="center">
          <BlockCards cards={movieRating}/>
          {pages > 1 && <MyPagination
            page={pageRated}
            setPageRated={setPageRated}
            pages={pages}
          />}
        </Flex>
      </Flex>}
      {pages === 0 && <RatedEmpty/>}
    </>
  );
};
export default Page;