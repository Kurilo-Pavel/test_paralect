import {Flex, Image, Text, ThemeIcon, Box} from '@mantine/core';
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {setDataMovie, setModal} from "@/app/store/movie/movieSlice";
import {useEffect, useState} from "react";
import movieInform from "@/app/components/MovieInform";

type MyCardProps = {
  height?: string;
  bigCard: boolean;
  id?: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  runtime?: number;
  budget?: number;
  revenue?: number;
}
const MyCard = (
  {
    height,
    bigCard,
    id,
    original_title,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    genre_ids,
    runtime,
    budget,
    revenue
  }: MyCardProps) => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const genresMovie = useAppSelector(state => state.movie.movieInform.genres);
  const genres = useAppSelector(state => state.movie.genres);
  const isModal = useAppSelector(state => state.movie.isModal)
  const [isRating, setIsRating] = useState(false);
  const [rating, setRating] = useState<null | number>(null)
  const width = bigCard ? "140px" : "";
  const widthImage = bigCard ? "250px" : "119px";

  useEffect(() => {
    if (localStorage.getItem("rating")) {
      const movieRating = JSON.parse(localStorage.getItem("rating"));
      if (movieRating.some(value => value.id === id)) {
        setIsRating(true);
        movieRating.forEach(value => {
          if (value.id === id) {
            setRating(value.rating);
          }
        });
      } else {
        setIsRating(false);
      }
    }
  }, [isModal]);

  const getNameGenre = () => {
    return genre_ids?.map(value => {
      let name;
      for (let i = 0; i < genres?.length; i++) {
        if (genres && value === genres[i].id) {
          name = genres[i].name;
        }
      }
      return name;
    });
  };
  const myRound = (num: number) => {
    if (num < 1e3) {
      return num;
    } else if (num >= 1e3 && num < 1e6) {
      return (num / 1e3).toFixed(1) + "K";
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + "M";
    }
  };

  const inform = bigCard ? [
    {title: "Duration", content: runtime},
    {title: "Premiere", content: release_date},
    {title: "Budget", content: `$${budget}`},
    {title: "Gross worldwide", content: `$${revenue}`},
    {
      title: "Genres", content: genresMovie?.map(value => value.name).join(", ")
    }
  ] : [{title: "Genres", content: getNameGenre()?.join(", ")}];

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(setModal(true));
    dispatch(setDataMovie(
      {
        id: id,
        original_title: original_title,
        poster_path: poster_path,
        release_date: release_date,
        vote_average: vote_average,
        vote_count: vote_count,
        genre_ids: genre_ids
      }));
  };

  return (
    <>
      {original_title && <Flex
        p="24px"
        justify="space-between"
        classNames={{root: "myCardRoot"}}
        onClick={() => {
          if (!bigCard) {
            router.push(`/${id}`);
          }
        }}
      >
        <Flex
          gap="16px"
          w="100%"
          classNames={{root: "contentCard"}}>
          <Flex
            h={height || "170px"}
            styles={{root: {minWidth: `${widthImage}`}}}
            bg={"var(--grey_100)"}
            align="center"
            justify="center">
            <Image
              src={poster_path ? "https://image.tmdb.org/t/p/original" + poster_path : "./empty_card.svg"}
              h={!poster_path ? "44px" : "100%"}
              w={!poster_path ? "57px" : "100%"}
            />
          </Flex>
          <Flex direction="column" justify="space-between">
            <Flex direction="column" gap="13px">
              <Text size="20px" fw="600" c="var(--purple_500_main)">{original_title}</Text>
              <Text size="16px" c="var(--grey_600)" fw="400">{new Date(release_date).getFullYear()}</Text>
              <Flex direction="row" align="center" gap="6px">
                <ThemeIcon variant="white" size="25px">
                  <Image src="./Star.svg"/>
                </ThemeIcon>
                <Text size="16px" fw="600" c="var(--black)">{vote_average.toFixed(1)}</Text>
                <Text fw="400" size="16px" c="var(--grey_600)" pl="4px">({myRound(vote_count)})</Text>
              </Flex>
            </Flex>
            <Flex direction="column" gap="12px">
              {inform.map((value, index) => <Flex key={index} gap="8px" direction="row">
                <Text size="16px" c="var(--grey_600)" fw="400" w={width}>{value.title}</Text>
                <Text c="var(--black)" size="16px" fw="400">{value.content}</Text>
              </Flex>)}
            </Flex>
          </Flex>
        </Flex>
        <ThemeIcon size="25px" variant="white" onClick={handleClick}>
          <Image src={isRating ? "./blue_star.svg" : "./empty_star.svg"} alt="nice"/>
          <Text size="16px" fw={600} m="4px" color="var(--black)">{rating}</Text>
        </ThemeIcon>
      </Flex>}
    </>
  );
};
export default MyCard;