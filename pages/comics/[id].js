import { useRouter } from "next/router";
import axios from "axios";

import md5 from "md5";
import { useEffect, useState } from "react";

const ComicId = () => {
  const router = useRouter();
  const [comicItem, setComicItem] = useState([]);
  // console.log(router.query.id);
  const comicId = router.query.id;
  const publicKey = "7dde07668a32d9f40655df6fc7622531";
  const privateKey = "797819fdd8761cfa29f64fa4e365f1a3db7bd0c4";

  const time = Number(new Date());

  const hash = md5(time + privateKey + publicKey);
  useEffect(() => {
    axios
      .get(
        `http://gateway.marvel.com/v1/public/comics/${comicId}?ts=${time}&apikey=${publicKey}&hash=${hash}`
      )
      .then((res) => setComicItem(res.data.data.results))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className=" w-full flex flex-col justify-center items-center mt-5">
      {comicItem.map((comic, index) => (
        <div className="flex flex-col justify-center items-center space-y-10">
          <div className="h-1/3 w-1/3 flex justify-center items-center">
            <img
              loading="lazy"
              src={`${
                comic?.thumbnail?.path !==
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                  ? comic?.thumbnail?.path
                  : ""
              }.jpg`}
              className={
                comic.description
                  ? "h-1/2 w-1/2 rounded-md shadow-md"
                  : "rounded-md shadow-md"
              }
              alt="Comic"
            />
          </div>

          <h2 className="text-4xl font-serif font-bold text-gray-900">
            {comic.title}
          </h2>

          <p className="text-lg font-thin w-4/5">
            {comic.description
              ? comic.description
              : "Check out the official website for more information, This might occur if there was an error with fetching from our database. Go back to the previous page and check out few other comics"}
          </p>
          <p>
            Print Price:{" "}
            {comic.prices[0].price == 0 ? "FREE" : `$${comic.prices[0].price}`}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ComicId;
