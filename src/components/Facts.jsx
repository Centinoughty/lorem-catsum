import { useEffect } from "react";
import { useState } from "react";

export default function Facts() {
  const [facts, setFacts] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    fetchFacts();
  }, [count]);

  async function fetchFacts() {
    try {
      const response = await fetch(
        `https://meowfacts.herokuapp.com/?count=${count}`
      );
      const resData = await response.json();
      const data = resData.data;
      setFacts(data);
    } catch (error) {
      console.error("Error fetching facts: ", error);
    }
  }

  return (
    <>
      <section className="flex flex-col md:flex-row gap-4 h-[80vh] p-8 my-4">
        <div className="flex flex-col gap-8 justify-center items-center md:w-1/2">
          <div className="text-center">
            <p className="text-4xl font-semibold text-left">Lorem Catsum</p>
            <p className="text-2xl font-light mt-2">The Lorem Ipsum for Cats</p>
          </div>
          <div className="flex flex-col items-center">
            <label className="text-lg mb-2">Number of Facts</label>
            <div className="grid grid-cols-3 items-center gap-4">
              <button
                onClick={() => setCount((prev) => (prev > 1 ? prev - 1 : 1))}
                className="px-4 py-2 bg-gray-200 rounded-md text-lg font-semibold"
              >
                -
              </button>
              <span
                className="text-2xl text-center cursor-pointer"
                onClick={fetchFacts}
              >
                {count}
              </span>
              <button
                onClick={() => setCount((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-200 rounded-md text-lg font-semibold"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center md:w-1/2">
          <div className="m-4 p-4 bg-gray-100 rounded-md shadow-md w-full h-full overflow-y-auto">
            {facts.length > 0 ? (
              <ul className="list-disc pl-5">
                {facts.map((fact, index) => (
                  <li key={index} className="mb-2">
                    {fact}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No facts available.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
