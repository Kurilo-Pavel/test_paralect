import {Flex, Image, Text, ThemeIcon, AspectRatio, Divider} from '@mantine/core';

type MovieInformProps = {
  overview: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  videos: {
    results:
      {
        name: string;
        key: string;
        site: string;
        id: string;
      }[]
  };
}
const MovieInform = ({production_companies, videos, overview}: MovieInformProps) => {

  return (
    <Flex p="24px" direction="column" gap="20px" w="100%"
          styles={{
            root: {borderRadius: "12px", background: "var(--white)"}
          }}
    >
      <Flex direction="column" gap="16px" w="500px">
        <Text size="20px" fw="700" c="var(--black)">Trailer</Text>
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={`https://www.youtube.com/embed/${videos.results[0]?.key}`}
            title="YouTube video player"
            style={{border: 0, borderRadius: "9px"}}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </AspectRatio>
      </Flex>
      <Divider color="var(--grey_300)"/>
      <Flex direction="column" gap="16px">
        <Text fw={700} size="20px" color="var(--black)">Description</Text>
        <Text fw={400} size="16px" color="var(--black)" maw="725px">{overview}</Text>
      </Flex>
      <Divider color="var(--grey_300)"/>
      <Flex direction="column" gap="16px">
        <Text fw={700} size="20px" color="var(--black)">Production</Text>
        <Flex direction="column" gap="12px">
          {production_companies.map((value, index) =>
            <Flex key={value.id} direction="row" gap="8px" align="center">
              <ThemeIcon variant="white" size="40px">
                <Image
                  src={value.logo_path ? "https://image.tmdb.org/t/p/original" + value.logo_path : "./empty_pr.svg"}/>
              </ThemeIcon>
              <Text fw={700} size="16px" color="var(--black)">{value.name}</Text>
            </Flex>)}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default MovieInform;