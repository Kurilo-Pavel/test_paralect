import {Flex, Image, Text, Button, Center} from '@mantine/core';
import {useRouter} from "next/navigation";

const RatedEmpty = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/`);
  };
  return (
    <Center h="100vh" w="100%">
      <Flex direction="column" gap="16px" align="center">
        <Image src="./empty-rated.png" alt="not found" w="400px"/>
        <Text fw="600" size="20px" c="var(--black)">You haven&apos;t rated any films yet</Text>
        <Button
          p="10px 20px"
          radius="8px"
          color="var(--purple_500_main)"
          onClick={handleClick}
        >Find movies</Button>
      </Flex>
    </Center>
  );
};
export default RatedEmpty;