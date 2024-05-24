"use client";
import {Flex, Breadcrumbs, Anchor, Loader} from '@mantine/core';
import MyCard from "@/app/components/MyCard";
import MovieInform from "@/app/components/MovieInform";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {getMovie} from "@/app/store/movie/movieSlice";
import NotFound from "@/app/not-found"
const Page = ({params}: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const movieInform = useAppSelector(state => state.movie.movieInform);
  const id = decodeURI(params.id);

  useEffect(() => {
    dispatch(getMovie(id));
  }, [dispatch,id]);

  const items = [
    {title: "Movies", href: "./"},
    {title: movieInform.original_title, href: "#"},
  ]
    .map((item, index) => (
      <Anchor href={item.href} key={index}>
        {item.title}
      </Anchor>
    ));
  return (
    <Flex direction="column" gap="20px" p="0 90px">
      {movieInform.original_title && <>
        <Breadcrumbs styles={{
        breadcrumb: {color: "var(--purple_500_main)"},
        separator: {color: "var(--purple_500_main)"}
      }}>{items}</Breadcrumbs>
      <MyCard
        id={id*1}
        height="352px"
        bigCard={true}
        original_title={movieInform.original_title}
        poster_path={movieInform.poster_path}
        release_date={movieInform.release_date}
        vote_average={movieInform.vote_average}
        vote_count={movieInform.vote_count}
        genres={movieInform.genres}
        runtime={movieInform.runtime}
        budget={movieInform.budget}
        revenue={movieInform.revenue}
      />
      <MovieInform
        overview={movieInform.overview}
        production_companies={movieInform.production_companies}
        videos={movieInform.videos}
      />
      </>}
      {movieInform.error && <NotFound/>}
    </Flex>
  );
};
export default Page