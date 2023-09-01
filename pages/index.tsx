import { Answer } from "@/components/Answer";
import { Search } from "@/components/Search";
import { SearchQuery } from "@/types";
import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [time, setTime] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({ query: "", sourceLinks: [] });
  const [answer, setAnswer] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/time')
    .then(res => res.json())
    .then(json => setTime(new Date(json.time)));
  }, []);

  return (
    <>
      <Head>
        <title>SCTY — Cite</title>
        <meta name="description" content="AI-powered search." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="h-screen overflow-auto bg-[#18181C] text-[#D4D4D8]">
        <a className="absolute top-0 right-12 p-4 cursor-pointer" href="https://twitter.com/sctyinc" target="_blank" rel="noreferrer">
          <IconBrandTwitter />
        </a>

        <a className="absolute top-0 right-2 p-4 cursor-pointer" href="https://github.com/amadad/" target="_blank" rel="noreferrer">
          <IconBrandGithub />
        </a>

        {answer ? (
          <Answer
            searchQuery={searchQuery}
            answer={answer}
            done={done}
            onReset={() => {
              setAnswer("");
              setSearchQuery({ query: "", sourceLinks: [] });
              setDone(false);
            }}
          />
        ) : (
          <Search
            onSearch={setSearchQuery}
            onAnswerUpdate={(value) => setAnswer((prev) => prev + value)}
            onDone={setDone}
          />
        )}

        {time && (
          <div className="absolute bottom-4 left-4">
            Current Time: {time.getHours()}:{time.getMinutes()}:{time.getSeconds()}
          </div>
        )}
      </div>
    </>
  );
}
