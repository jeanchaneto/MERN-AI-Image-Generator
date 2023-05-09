import { useState } from "react";
import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => {
      <Card key={post.id} {...post} />;
    });
  }
  return (
    <h2 className=" mt-5 font-bold text-[#6449ff] text-xl uppercase">
      {title}
    </h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState();
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#22328] text-[32px] ">
          The Community Showcase
        </h1>
        <p className=" mt-2 text-[#666e75] text-base max-w-[500px]">
          Browse through a collection of imaginative and visually stunning AI
          generated images
        </p>
      </div>

      <div className="mt-16">
        <FormField />
      </div>

      <div className="mt-10">
        {loading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className=" font-medium text-[#666e75] text-xl mb-3 ">
                Showing results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grids-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={[]}
                  title="No search results found"
                />
              ) : (
                <RenderCards 
                    data={[]}
                    title="No post found"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
