"use client";
import {Flex, Avatar, Text, NavLink, Space} from '@mantine/core';
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [isActive, setIsActive] = useState(true);

  useEffect(()=>{
    if(pathName.split("/")[1] === "rated"){
      setIsActive(false);
    }else{
      setIsActive(true);
    }
  },[pathName]);

  return (
    <>
      <Flex gap="12px" align="center">
        <Avatar variant="transparent" size="32px" src="./logo.svg"/>
        <Text c="var(--purple_500_main)" size="24px" fw="700" ff="Poppins">ArrowFlicks</Text>
      </Flex>
      <Space h="85px"/>
      <NavLink
        color="var(--purple_500_main)"
        p="10px"
        styles={{label: {fontSize: "16px"}}}
        style={{borderRadius: "8px"}}
        lh="21.4px"
        fw={isActive ? "700" : "400"}
        label="Movies"
        onClick={() => {
          router.push("/");
        }}
        active={isActive}
      />
      <Space h="16px"/>
      <NavLink
        color="var(--purple_500_main)"
        p="10px"
        styles={{label: {fontSize: "16px"}}}
        style={{borderRadius: "8px"}}
        lh="21.4px"
        fw={!isActive ? "700" : "400"}
        label="Page movies"
        active={!isActive}
        onClick={() => {
          router.push("/rated");
        }}
      />
    </>
  )
};
export default Navbar;