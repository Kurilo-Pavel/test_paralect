"use client"
import {AppShell, Burger,Loader, rem} from '@mantine/core';
import Navbar from "@/app/components/Navbar";
import MyModal from "@/app/components/MyModal";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {getGenres} from "@/app/store/movie/movieSlice";
import { useDisclosure } from '@mantine/hooks';

const Home = ({children,}: Readonly<{
  children: React.ReactNode;
}>) => {
  const data = useAppSelector(state => state.movie);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  const [opened, {toggle}] = useDisclosure();

  return (
    <AppShell
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <Burger
        opened={opened}
        onClick={toggle}
        hiddenFrom="sm"
        size="md"
        m="25px 20px"
        classNames={{root:"burger"}}
      />
      <AppShell.Navbar p="24px">

        <Navbar/>
      </AppShell.Navbar>

      <AppShell.Main
        p={`40px 90px 82px calc(${rem(280)} + 90px)`}
        classNames={{main: "appMain"}}
      >
        {children}
      </AppShell.Main>
      {data.loader && <Loader
        color="var(--purple_500_main)"
        size="xl" w="100%"
        styles={{
          root: {
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            alignItems: "center",
            height: "100%",
            top: "0"
          }
        }}
      />}
      <MyModal/>
    </AppShell>
  );
};
export default Home;