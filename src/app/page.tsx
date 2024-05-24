"use client";
import {Title, Space, Flex, Grid, Button, Loader} from '@mantine/core';
import Dropdown from "@/app/components/Dropdown";
import {useForm} from '@mantine/form';
import MyNumberInput from "@/app/components/MyNumberInput";
import BlockCards from "@/app/components/BlockCards";
import MyPagination from "@/app/components/MyPagination";
import EmptyBlock from "@/app/components/EmptyBlock";
import React, {useEffect} from "react";
import validate from "@/app/validation.mjs";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {
  getMovies, setError,
  setGenres,
  setRatingFrom,
  setRatingTo,
  setReleaseYear
} from "@/app/store/movie/movieSlice";
import MySelect from "@/app/components/MySelect";

interface FormValues {
  genre: string[],
  releaseYear: string | null,
  ratingFrom: number | null | string,
  ratingTo: number | null,
}

const Movies = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.movie);
  const years = [...Array(200)].map((_, index) => (2026 - index).toString());

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    validateInputOnBlur: true,
    validateInputOnChange: true,
    initialValues: {
      genre: data.selectGenres,
      releaseYear: data.releaseYear,
      ratingFrom: data.ratingFrom,
      ratingTo: data.ratingTo,
    },
    validate: {
      ratingFrom: (value) => validate(value, form.getValues().ratingTo, true),
      ratingTo: (value) => validate(value, form.getValues().ratingFrom, false),
    },
  });

  const transform = (values: string[]) => {
    return values.map(value =>
      data.genres.filter(genre => {
        if (genre.name === value) {
          return genre.id;
        }
      })
    ).map(value => value[0].id);
  };

  useEffect(() => {
    if (form.errors.ratingTo || form.errors.ratingFrom) {
      dispatch(setError(true));
    } else {
      dispatch(setError(false));
    }
  }, [dispatch, form.errors])

  useEffect(() => {
    if (!data.error && !form.errors.ratingFrom && !form.errors.ratingTo) {
      dispatch(getMovies({
        genres: transform(form.getValues().genre),
        releaseYear: form.getValues().releaseYear,
        ratingFrom: form.getValues().ratingFrom,
        ratingTo: form.getValues().ratingTo,
        sortMovie: data.sort,
        page: data.page
      }));
    }
  }, [dispatch, data.error, data.selectGenres.length, data.releaseYear, data.ratingFrom, data.ratingTo, data.sort, data.page]);

  return (
    <>
      <Title
        order={1}
        style={{letterSpacing: "-1px"}}
      >Movies</Title>
      <Space h="41.5px"/>
      <Flex
        gap="24px"
        direction="column"
        align="flex-end"
      >
        <form
          className="searchForm"
        >
          <Grid gap="16px" w="100%" align="flex-end">
            <Grid.Col span={"auto"}>
              <Dropdown
                label="Genres"
                placeholder="Select genre"
                dataOptions={data.genres.map(value => value.name)}
                minWidth="170px"
                labelPadding="8px"
                key={form.key("genre")}
                {...form.getInputProps("genre")}
                defaultValue={data.selectGenres}
              />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <MySelect
                key={form.key("releaseYear")}
                {...form.getInputProps("releaseYear")}
                label="Release year"
                placeholder="Select release year"
                dataOptions={years}
                defaultValue={data.releaseYear}
                minWidth="170px"
                labelPadding="8px"
                type="year"
              />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Flex
                gap="8px"
                align="flex-end"
                classNames={{
                  root:"wrapperNumberInput"
                }}
              >
                <MyNumberInput
                  {...form.getInputProps("ratingFrom")}
                  key={form.key("ratingFrom")}
                  placeholder="From"
                  label="Ratings"
                  type="from"
                  defaultValue={data.ratingFrom}
                />
                <MyNumberInput
                  placeholder="To"
                  {...form.getInputProps("ratingTo")}
                  key={form.key("ratingTo")}
                  type="to"
                  defaultValue={data.ratingTo}
                />
              </Flex>
            </Grid.Col>
          </Grid>
          <Button
            variant="transparent"
            color="var(--purple_500_main)"
            size="md"
            disabled={!data.selectGenres[0] && !data.releaseYear && !data.ratingFrom && !data.ratingTo}
            w="100%"
            p={0}
            fw={500}
            onClick={() => {
              dispatch(setReleaseYear(null));
              dispatch(setGenres([]));
              dispatch(setRatingFrom(""));
              dispatch(setRatingTo(""));
              form.setValues({genre: [], releaseYear: null, ratingFrom: "", ratingTo: ""})
            }}
            styles={{
              root: {
                display: "flex",
                justifyContent: "flex-end",
                maxWidth: "87px",
                letterSpacing: "-0.7px"
              }
            }}
            classNames={{
              root: "reset-button"
            }}
          >Reset filters</Button>
        </form>
        <MySelect
          label="Sort by"
          dataOptions={["Most Popular", "Least Popular", "Most Rated", "Least Rated", "Most Voted", "Least Voted"]}
          defaultValue={data.sort}
          minWidth="284px"
          labelPadding="5px"
          type="sort"
        />
        {!data.loader && <BlockCards
          cards={data.movies.results}
        />}
        {(data.movies.results.length === 0 && data.movies.page === 0) && <EmptyBlock/>}
        {(!data.loader && data.movies.total_pages >= 2) && <MyPagination
          pages={data.movies.total_pages}
          type="movies"
          page={data.page}
        />}
      </Flex>
    </>
  );
};
export default Movies;