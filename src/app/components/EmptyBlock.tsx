import {Flex, Image, Title, Text, ThemeIcon} from '@mantine/core';

const EmptyBlock = () => {
  return(
    <Flex align="center" w="100%" direction="column" gap="16px">
      <Image src="./Empty.png" alt="empty" w="310px"/>
      <Text size="20px" fw={600} c="var(--black)">We don&apos;t have such movies, look for another one</Text>
    </Flex>
  )
 };
export default EmptyBlock;