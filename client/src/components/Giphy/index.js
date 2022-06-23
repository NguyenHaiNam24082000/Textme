import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import { SimpleGrid, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./index.css";

const gifsGallery = [
  {
    id: 1,
    value: "Favourites",
    src: "https://media2.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif",
  },
  {
    id: 2,
    value: "Trending",
    src: "https://media3.giphy.com/media/2YnutB6bmlLaX7eG89/giphy.gif",
  },
  {
    id: 3,
    value: "Random",
    src: "https://media4.giphy.com/media/6FUT75miVgVKE/giphy.gif",
  },
  {
    id: 4,
    value: "Awesome",
    src: "https://media3.giphy.com/media/3ohzdIuqJoo8QdKlnW/giphy.gif",
  },
  {
    id: 5,
    value: "Cute",
    src: "https://media2.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif",
  },
  {
    id: 6,
    value: "jk",
    src: "https://media3.giphy.com/media/pY1V0UU8TnB72/giphy.gif",
  },
  {
    id: 7,
    value: "good luck",
    src: "https://media1.giphy.com/media/l3BwSPbqx3QGKEgpp2/giphy.gif",
  },
  {
    id: 8,
    value: "good",
    src: "https://media1.giphy.com/media/11ISwbgCxEzMyY/giphy.gif",
  },
  {
    id: 9,
    value: "bad",
    src: "https://media4.giphy.com/media/M91dKHqpR5f0Jf75wa/giphy.gif",
  },
  {
    id: 10,
    value: "high five",
    src: "https://media1.giphy.com/media/26ufgSwMRqauQWqL6/giphy.gif",
  },
  {
    id: 11,
    value: "nervous",
    src: "https://media1.giphy.com/media/l4FATJpd4LWgeruTK/giphy.gif",
  },
  {
    id: 12,
    value: "duh",
    src: "https://media3.giphy.com/media/AC1HrkBir3bGg/giphy.gif",
  },
  {
    id: 13,
    value: "aww",
    src: "https://media1.giphy.com/media/uw0KpagtwEJtC/giphy.gif",
  },
  {
    id: 14,
    value: "scared",
    src: "https://media0.giphy.com/media/ph6ewybUlGbW8/giphy.gif",
  },
  {
    id: 15,
    value: "bored",
    src: "https://media2.giphy.com/media/RKS1pHGiUUZ2g/giphy.gif",
  },
  {
    id: 16,
    value: "happy",
    src: "https://media3.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",
  },
  {
    id: 17,
    value: "sigh",
    src: "https://media0.giphy.com/media/g0HkznFtL1d0xVRI1G/giphy.gif",
  },
  {
    id: 18,
    value: "kiss",
    src: "https://media0.giphy.com/media/Wnw5m8RPhLcOY/giphy.gif",
  },
  {
    id: 19,
    value: "cry",
    src: "https://media0.giphy.com/media/L95W4wv8nnb9K/giphy.gif",
  },
  {
    id: 20,
    value: "angry",
    src: "https://media0.giphy.com/media/l1J9u3TZfpmeDLkD6/giphy.gif",
  },
  {
    id: 21,
    value: "good night",
    src: "https://media3.giphy.com/media/EZICHGrSD5QEFCxMiC/giphy.gif",
  },
  {
    id: 22,
    value: "good morning",
    src: "https://media4.giphy.com/media/l2olcETxXQjImhNcm2/giphy.gif",
  },
  {
    id: 23,
    value: "good evening",
    src: "https://media2.giphy.com/media/gPsh6c0McdLgDPrJl5/giphy.gif",
  },
  {
    id: 24,
    value: "good afternoon",
    src: "https://media3.giphy.com/media/ABAQrbLoeXocAKLvMn/giphy.gif",
  },
  {
    id: 25,
    value: "confused",
    src: "https://media0.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif",
  },
  {
    id: 26,
    value: "thinking",
    src: "https://media2.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif",
  },
  {
    id: 27,
    value: "congrats",
    src: "https://media1.giphy.com/media/qx8pi39Lwm9Xm2audb/giphy.gif",
  },
  {
    id: 28,
    value: "yay",
    src: "https://media3.giphy.com/media/3NtY188QaxDdC/giphy.gif",
  },
  {
    id: 29,
    value: "love",
    src: "https://media4.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy.gif",
  },
  {
    id: 30,
    value: "haha",
    src: "https://media4.giphy.com/media/gj0QdZ9FgqGhOBNlFS/giphy.gif",
  },
  {
    id: 31,
    value: "yes",
    src: "https://media2.giphy.com/media/3ohhweiVB36rAlqVCE/giphy.gif",
  },
  {
    id: 32,
    value: "no",
    src: "https://media4.giphy.com/media/d10dMmzqCYqQ0/giphy.gif",
  },
  {
    id: 33,
    value: "ok",
    src: "https://media3.giphy.com/media/tIeCLkB8geYtW/giphy.gif",
  },
  {
    id: 34,
    value: "bye",
    src: "https://media2.giphy.com/media/42D3CxaINsAFemFuId/giphy.gif",
  },
  {
    id: 35,
    value: "lol",
    src: "https://media3.giphy.com/media/26DMZmtN3XAaxW8Xm/giphy.gif",
  },
  {
    id: 36,
    value: "excited",
    src: "https://media2.giphy.com/media/UO5elnTqo4vSg/giphy.gif",
  },
  {
    id: 37,
    value: "sorry",
    src: "https://media3.giphy.com/media/3ohc1ffY03hnhRUyUU/giphy.gif",
  },
  {
    id: 38,
    value: "sleepy",
    src: "https://media4.giphy.com/media/NWg7M1VlT101W/giphy.gif",
  },
  {
    id: 39,
    value: "hello",
    src: "https://media0.giphy.com/media/dzaUX7CAG0Ihi/giphy.gif",
  },
  {
    id: 40,
    value: "welcome",
    src: "https://media2.giphy.com/media/XD9o33QG9BoMis7iM4/giphy.gif",
  },
  {
    id: 41,
    value: "hugs",
    src: "https://media4.giphy.com/media/z1Ss4CmBlWbUcn9YRs/giphy.gif",
  },
  {
    id: 42,
    value: "please",
    src: "https://media2.giphy.com/media/TkBoNth0Ps3Vm/giphy.gif",
  },
  {
    id: 43,
    value: "thank you",
    src: "https://media1.giphy.com/media/uWlpPGquhGZNFzY90z/giphy.gif",
  },
  {
    id: 44,
    value: "thumbs up",
    src: "https://media0.giphy.com/media/GCvktC0KFy9l6/giphy.gif",
  },
  {
    id: 45,
    value: "thumbs down",
    src: "https://media4.giphy.com/media/NmMb69LluiCmA/giphy.gif",
  },
  {
    id: 46,
    value: "punch",
    src: "https://media0.giphy.com/media/GRM7Z2s6AougoR3rvv/giphy.gif",
  },
  {
    id: 47,
    value: "miss you",
    src: "https://media1.giphy.com/media/Jt5GkWXoLswrgP2Aws/giphy.gif",
  },
  {
    id: 48,
    value: "wink",
    src: "https://media4.giphy.com/media/dk3TmFZpn6pUI/giphy.gif",
  },
  {
    id: 49,
    value: "whatever",
    src: "https://media4.giphy.com/media/xUA7b3nP48CphwM89i/giphy.gif",
  },
  {
    id: 50,
    value: "dance",
    src: "https://media4.giphy.com/media/l2JJpWxDmQBGZNRRe/giphy.gif",
  },
  {
    id: 51,
    value: "hungry",
    src: "https://media0.giphy.com/media/GnCc88zZhSVUc/giphy.gif",
  },
];
const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function GridGif({ query,setEmbed }) {
  const fetchGifs = async (offset) => {
    const result = await giphyFetch.trending({ offset, limit: 10 });
    if (offset === 0) {
      const [firstGif] = result.data;
      firstGif.bottle_data = {
        // fake an ad, this should have moat
        tid: query,
      };
    }
    return result;
  };
  return (
    <div className="max-h-72 h-72 overflow-y-scroll overflow-x-hidden">
      <Grid noLink={true} onGifClick={(gif,e)=>{
        console.log(gif,e)
        setEmbed([{
          provider: {
            name: "giphy",
            url: "https://giphy.com/gifs/",
          },
          type: "gifv",
          url: gif.url,
          title: gif.title,
          thumbnail: {
            url: gif.images.original.url,
            width: gif.images.original.width,
            height: gif.images.original.height,
          },
          media: {
            url: gif.images.original.mp4,
            width: gif.images.original.width,
            height: gif.images.original.height,
          },
        }])
      }} fetchGifs={fetchGifs} width={390} columns={2} gutter={6} />
    </div>
  );
}

export default function Giphy({setEmbed}) {
  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 500);
  return (
    <div className="relative overflow-hidden">
      <div className="mb-3 shadow-md">
        <TextInput
          placeholder="Search Gif - Powered by Giphy"
          variant="filled"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </div>
      <CSSTransition
        in={!debounced && "main"}
        timeout={250}
        classNames="menu-primary"
        unmountOnExit
      >
        <div>
          <SimpleGrid
            cols={2}
            className="max-h-72 overflow-y-scroll overflow-x-hidden"
          >
            {gifsGallery &&
              gifsGallery.map((gif, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setValue(gif.value);
                  }}
                  className="rounded bg-yellow-500 text-base font-normal text-white h-32 cursor-pointer hover:underline overflow-hidden"
                >
                  <div
                    className="flex justify-center items-center w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `url(${gif.src}) center center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  >
                    {gif.value}
                  </div>
                </div>
              ))}
          </SimpleGrid>
        </div>
      </CSSTransition>
      <CSSTransition
        in={debounced && "searchGifs"}
        timeout={250}
        classNames="menu-secondary"
        unmountOnExit
      >
        <div>
          <GridGif query={debounced} setEmbed={setEmbed} />
        </div>
      </CSSTransition>
    </div>
  );
}
