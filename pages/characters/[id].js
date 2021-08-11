import { useRouter } from "next/router";
import axios from "axios";

import md5 from "md5";
import { useEffect, useState } from "react";

const CharacterItem = () => {
  const router = useRouter();
  const [characterItem, setCharacterItem] = useState([]);
  // console.log(router.query.id);
  const characterId = router.query.id;
  const publicKey = "7dde07668a32d9f40655df6fc7622531";
  const privateKey = "797819fdd8761cfa29f64fa4e365f1a3db7bd0c4";

  const time = Number(new Date());

  const hash = md5(time + privateKey + publicKey);
  useEffect(() => {
    axios
      .get(
        `http://gateway.marvel.com/v1/public/characters/${characterId}?ts=${time}&apikey=${publicKey}&hash=${hash}`
      )
      .then((res) => setCharacterItem(res.data.data.results))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className=" w-full flex flex-col justify-center items-center mt-5">
      {characterItem.map((character, index) => (
        <div
          className="flex flex-col justify-center items-center space-y-10"
          key={index}
        >
          <div className="h-1/3 w-1/3 flex justify-center items-center">
            <img
              loading="lazy"
              src={`${
                character?.thumbnail?.path !==
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                  ? character?.thumbnail?.path
                  : ""
              }.jpg`}
              className={
                character.description
                  ? "h-1/2 w-1/2 rounded-md shadow-md"
                  : "rounded-md shadow-md"
              }
              alt="character"
            />
          </div>

          <h2 className="text-4xl font-serif font-bold text-gray-900">
            {character.name}
          </h2>

          <p className="text-lg font-thin w-4/5">
            {character.description
              ? character.description
              : "Check out the official website for more information, This might occur if there was an error with fetching from our database. Go back to the previous page and check out few other characters"}
          </p>
          <p>
            Get to know more about me:{" "}
            <a
              target="_blank"
              className="text-blue-500 text-lg hover:opacity-75"
              href={character?.urls[1].url}
            >
              Click me
            </a>
          </p>
        </div>
      ))}
    </div>
  );
};

export default CharacterItem;
