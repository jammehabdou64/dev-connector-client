"use client";
import Feeds from "../components/Feeds";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SmallMediaFooter from "../components/SmallMediaFooter";
import Widget from "../components/Widget";

export default function Home() {
  // console.log(profile);
  return (
    <>
      <Header />
      <main className="max-w-6xl mt-16 px-4 sm:px-0 md:px-4 lg:px-12 pt-8 mx-auto">
        <div className="flex  sm:px-2 lg:px-0 md:justify-between md:space-x-8">
          <section className="side-bar sm:mx-auto md:mx-0 max-w-[280px] hidden sm:w-[200px] sm:block relative md:block  ">
            <Sidebar />
          </section>
          <section className="feed flex-1 ">
            <Feeds />
          </section>
          <section className="widget relative top-0 w-[300px] hidden lg:block">
            <Widget />
          </section>
        </div>
      </main>
      <SmallMediaFooter />
    </>
  );
}

Home.auth = true;
