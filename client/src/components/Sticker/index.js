import React, { useEffect, useState } from "react";
import axios from "axios";
import { AspectRatio, Image, SimpleGrid, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import InfiniteScroll from "react-infinite-scroll-component";

const API_KEY = "254762550b66e34d883de58b4c960344";
const userId = "123";

const TrendingStickers = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      getPhotos(page + 1);
    }, 1500);
  };
  const getPhotos = (page) => {
    let config = {
      headers: {
        apiKey: API_KEY,
      },
    };
    setPage(page + 1);
    axios
      .get(
        `https://messenger.stipop.io/v1/package?userId=${userId}&pageNumber=${page}&lang=en&countryCode=US`,
        config
      )
      .then((res) => {
        setPhotos([...photos, ...res.data.body.packageList]);
      });
  };
  return (
    <div className="max-h-72 h-72 overflow-y-scroll overflow-x-hidden">
      <InfiniteScroll
        dataLength={photos.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <SimpleGrid cols={4} spacing="xs">
          {photos &&
            photos.map((user, index) => (
              <AspectRatio
                ratio={1 / 1}
                className="rounded hover:bg-slate-100 cursor-pointer select-none"
              >
                <Image
                  radius="xs"
                  src={user.packageImg}
                  withPlaceholder
                  alt="Panda"
                />
              </AspectRatio>
            ))}
        </SimpleGrid>
      </InfiniteScroll>
    </div>
  );
};

const searchStickers = ({query}) => {
}


export default function Sticker() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [bottom, setBottom] = useState(false);
  const [query, setQuery] = useState(null);
  const [debounced] = useDebouncedValue(query, 500);
  useEffect(() => {
    getPhotos(page);
  }, []);
  useEffect(() => {
    if (debounced) {
      setPhotos([]);
      querySearch(debounced, page);
    }
  }, [query]);
  const getPhotos = (page) => {
    let config = {
      headers: {
        apiKey: API_KEY,
      },
    };
    if (bottom === true) {
      setPage(page + 1);
    }
    axios
      .get(
        `https://messenger.stipop.io/v1/package?userId=${userId}&pageNumber=${page}&lang=en&countryCode=US`,
        config
      )
      .then((res) => {
        setPhotos([...photos, ...res.data.body.packageList]);
      });
  };
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    setBottom(true);
    if (bottom) {
      continueQuery(query, page);
      setBottom(false);
    }
  };
  const continueQuery = async (queryString, page) => {
    let config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    if (bottom === true) {
      setPage(page + 1);
    }
    if (queryString !== null) {
      await axios
        .get(
          `https://messenger.stipop.io/v1/search?userId=${userId}&q=${queryString}&lang=en&pageNumber=${page}&limit=20`,
          config
        )
        .then((res) => {
          if (res.data.body.stickerList !== null || photos === !null) {
            setPhotos([...photos, ...res.data.body.stickerList]);
          }
        });
    }
  };
  const querySearch = async (queryString, page) => {
    let config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    if (queryString !== null) {
      await axios
        .get(
          `https://messenger.stipop.io/v1/search?userId=${userId}&q=${queryString}&lang=en&pageNumber=${page}&limit=20`,
          config
        )
        .then((res) => {
          if (res.data.body.stickerList !== null) {
            setPhotos([...photos, ...res.data.body.stickerList]);
          }
        });
    }
  };
  console.log(photos, "photos");
  return (
    <div className="relative overflow-hidden">
      <div className="mb-3 shadow-md">
        <TextInput
          placeholder="Search Stickers - Powered by Stipop.io"
          variant="filled"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <TrendingStickers />
    </div>
  );
}
