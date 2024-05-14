import InitialServer from "@/components/server/initial-server";
import { ProfileSettings } from "@/components/server/profile-settings";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    <div className="flex flex-col h-screen">
      <div
        className={`flex flex-col h-full text-primary w-full  ${
          profile.bgImage !== null
            ? "dark:backdrop-brightness-90 dark:backdrop-blur-sm"
            : ""
        } `}
      >
        <p className="fixed left-0 top-0 flex w-[100vw] justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 pr-10 pl-10">
          <span className="text-xl">
            Hi, <span className="text-purple-600">{profile.name}</span>{" "}
          </span>
          <ProfileSettings profile={profile} />
        </p>
        <div className="w-[100vw]">
          <p className=" dark:drop-shadow-[0_0_0.15rem_#ffffff70] dark:text-white md:text-9xl text-6xl mb-14 mt-40 font-extrabold flex flex-col items-center justify-center w-full pl-10 pb-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 pb-10 w-full">
              Start By Creating{" "}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">
              Your Own Server
            </span>
          </p>
        </div>
        <div className=" w-full flex justify-center items-center">
          <InitialServer profile={profile} />
        </div>
      </div>
    </div>
  );
};

export default ServerPage;
