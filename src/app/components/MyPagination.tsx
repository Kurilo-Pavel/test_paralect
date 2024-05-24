import {Pagination} from '@mantine/core';
import {useAppDispatch} from "@/app/store/hooks";
import {setPage} from "@/app/store/movie/movieSlice";
import {MouseEventHandler} from "react";

type MyPaginationProps = {
  pages: number;
  type?: string;
  page: number;
  setPageRated?: (page: number) => void;
}

const MyPagination = ({pages, type, page, setPageRated}: MyPaginationProps) => {
  const dispatch = useAppDispatch();
  const handleClick = (e:number) => {
    if (type === "movies") {
      dispatch(setPage(e));
    }
    if (setPageRated) {
      setPageRated(e);
    }
  }
  return (
    <Pagination
      value={page}
      total={pages}
      color="var(--purple_500_main)"
      onChange={handleClick}
      siblings={1}/>
  );
};
export default MyPagination;