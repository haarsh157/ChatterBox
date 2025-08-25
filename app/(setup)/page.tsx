"use client";

// import { useEffect, useState } from "react";
import Link from "next/link";
// import { redirect } from "next/navigation";

const SetupPage = () => {
  // const [cookies, setCookies] = useState("");

  // useEffect(() => {
  //   const cookies = document.cookie;
  //   console.log(cookies);
  //   setCookies(cookies);

  //   if (cookies) return redirect("/servers");
  // }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-[100vw] max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-[100vw] justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by Signing in&nbsp;
        </p>
        <div className="fixed bottom-0 left-0 flex h-32 w-[100vw] items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none backdrop-filter backdrop-blur-xl">
          <span className="cursor-pointer flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
            <Link
              href="/servers"
              className=" cursor-pointer px-4 py-2 rounded-full  relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:text-slate-800 text-xl font-extrabold bg-slate-300 "
            >
              Sign-in
            </Link>
          </span>
        </div>
      </div>

      <div className="after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px] animate-pulse duration-5000">
        <p className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:text-white md:text-9xl text-6xl mb-14 mt-10 font-extrabold ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            Chatter
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">
            Box
          </span>
        </p>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <Link
          href="/servers"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold ">
            Servers{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Create an invite-only place where you belong
          </p>
        </Link>

        <Link
          href="/servers"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 "
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold ">
            Channels{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            zz
          </p>
        </Link>

        <Link
          href="/servers"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Explore...{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Break the ice, make new friends, and share your world. Chat away!
          </p>
        </Link>

        <Link
          href="/servers"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Play Now!!{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Enter a world of endless conversation and endless fun. Play now!
          </p>
        </Link>
      </div>
    </main>
  );
};

export default SetupPage;
