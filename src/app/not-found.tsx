"use client"
import {Flex, Image, Text, Button, Center} from '@mantine/core';
import {useRouter} from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`./`);
  };
  return (
    <Center h="100vh" w="100%">
      <Flex direction="column" gap="48px" align="center" >
        <Image src="../not-found.png" alt="not found" w="650px"/>
        <Text fw="600" size="20px" c="var(--black)">We can’t find the page you are looking for</Text>
        <Button
          p="10px 20px"
          radius="8px"
          color="var(--purple_500_main)"
          onClick={handleClick}
        >Go Home</Button>
      </Flex>
    </Center>
  );
};
export default NotFound;