import { gif_infinite } from "src/assets";

export const ImPrintRoute = () => {
  return (
    // <div className="w-[60vw] h-[70vh] rounded-2xl bg-white m-auto ">
    //   <div className="w-[60vw] h-[70vh] rounded-2xl bg-white m-auto ">
    //     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
    //     repellat dolor itaque tenetur quibusdam neque labore illo explicabo
    //     harum! Reprehenderit cumque rerum saepe rem asperiores corrupti
    //     voluptatum assumenda, facere amet?
    //   </div>
    // </div>
    <div className="flex flex-col w-[90vw] h-[70vh] sm:w-[90vw] sm:h-[80vh] lg:w-[60%] lg:h-[70vh] justify-center items-center rounded-2xl bg-white m-auto ">
      <figure className="h-[150px] ms:h-[200px] md:h-[200px] flex justify-center">
        <img
          className="w-[150px] md:w-[250px] h-auto"
          src={gif_infinite}
          alt="infinity"
        />
      </figure>
      <div className="flex space-x-1 text-lg  font-semibold">
        {"Product loading . . .".split("").map((char, index) => (
          <span
            key={index}
            className="inline-block animate-wave"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};
