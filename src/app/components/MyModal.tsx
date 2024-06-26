import {Modal, Text, Flex, Button, Rating} from '@mantine/core';
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {setModal} from "@/app/store/movie/movieSlice";

const MyModal = () => {
  const dispatch = useAppDispatch();
  const dataMovie = useAppSelector(state => state.movie.dataMovie);
  const isModal = useAppSelector(state => state.movie.isModal);

  const [value, setValue] = useState(0);

  const handleClick = () => {
    dispatch(setModal(false));
    setValue(0);
  };

  const handleSave = () => {
    const copyData = Object.assign({}, dataMovie, {rating: 0});
    if (!localStorage.getItem("rating")) {
      copyData.rating = value;
      localStorage.setItem("rating", JSON.stringify([copyData]));
    } else {
      const localData = localStorage.getItem("rating");
      if (localData) {
        const userRatings = JSON.parse(localData) as { id: number }[];
        if (userRatings.some(value => value.id === dataMovie.id)) {
          const newUserRatings = userRatings.map(data => {
            if (data.id === dataMovie.id) {
              copyData.rating = value;
              return copyData;
            } else {
              return data;
            }
          });
          localStorage.setItem("rating", JSON.stringify(newUserRatings));
        } else {
          copyData.rating = value;
          localStorage.setItem("rating", JSON.stringify([...userRatings, copyData]));
        }
      }
    }
  };

  const handleRemove = () => {
    const localData = localStorage.getItem("rating");
    if (localData) {
      const userRatings = JSON.parse(localData) as {id:number}[];
      if (userRatings.some(data => data.id === dataMovie.id)) {
        const newUserRating = userRatings.filter(data => data.id != dataMovie.id);
        localStorage.setItem("rating", JSON.stringify(newUserRating));
      }
    }
  };

  return (<>
      {<Modal
        opened={isModal}
        onClose={handleClick}
        title="Your rating"
        centered
        radius="8px"
        size="380px"
        p="16px"
        styles={{
          body: {paddingTop: "16px", borderTop: "1px solid var(--grey_200)"}
        }}
        overlayProps={{
          opacity: 0.4,
        }}
      >
        <Flex direction="column" gap="16px">
          <Text>Coco</Text>
          <Flex justify="space-between">
            <Rating
              value={value}
              onChange={setValue}
              w="100%"
              count={10}
              size="25px"
              styles={{root: {justifyContent: "space-between"}}}
            />
          </Flex>
          <Flex direction="row">
            <Button
              p="10px 20px"
              radius="8px"
              color="var(--purple_500_main)"
              onClick={handleSave}
            >Save</Button>
            <Button
              p="10px 20px"
              radius="8px"
              variant="transparent"
              color="var(--purple_500_main)"
              onClick={handleRemove}
            >Remove
              rating</Button>
          </Flex>
        </Flex>
      </Modal>}
    </>
  );
};
export default MyModal;