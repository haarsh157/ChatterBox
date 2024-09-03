import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  return (
    <div
      className="h-full bg-no-repeat relative dark:bg-gradient-to-t dark:from-[#1e1f21] dark:from-10% dark:via-[#292a2d] dark:via-50% dark:to-[#36373a] "
      style={{
        backgroundImage: profile.bgImage ? `url("${profile.bgImage}")` : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {profile.bgImage && (
        <div
          className="absolute inset-0 bg-black opacity-40"
          style={{ zIndex: 1 }}
        />
      )}

      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full relative z-10">{children}</main>
    </div>
  );
};

export default MainLayout;
