import images from "@/constants/images";
import { Link } from "react-router-dom";
import BreadCrumbs from "@/components/BreadCrumbs";
import SuggestedPosts from "./SuggestedPosts";
import CommentsContainer from "../../components/comments/CommentsContainer";

const breadCrumbsData = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blog" },
  { name: "Article title", link: "/blog/1" },
];

const postData = [
  {
    _id: "1",
    image: images.post1,
    title: "Help children get better education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "2",
    image: images.post1,
    title: "Help children get better education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "3",
    image: images.post1,
    title: "Help children get better education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "4",
    image: images.post1,
    title: "Help children get better education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
];

const tagsData = [
  "medical",
  "lifestyle",
  "learn",
  "healthy",
  "food",
  "diet",
  "education",
];

const ArticleDetails = () => {
  return (
    <section className="flex flex-col justify-center gap-5 md:flex-row px-4">
      <article className="w-full md:w-[60%]">
        <BreadCrumbs data={breadCrumbsData} />
        <img className="rounded-xl w-full" src={images.post1} alt="" />
        <div className="mt-4 flex gap-2">
          {/* {data?.categories.map((category) => ( */}
          <Link
            to={`/blog?category=selectedCategory`}
            className="text-primary text-sm font-roboto inline-block md:text-base uppercase"
          >
            {/* {category.name} */}
            Education
          </Link>
          {/* ))} */}
        </div>
        <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
          {/* {data?.title} */}
          Lorem ipsum dolor sit amet consectetur.
        </h1>
        <div className="w-full">
          {/* {!isLoading && !isError && (
            <Editor content={data?.body} editable={false} />
          )} */}
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non illo,
          quis quod suscipit ipsam sed nostrum autem rem soluta reprehenderit
          distinctio voluptate enim doloremque eius rerum laboriosam inventore
          dolore facilis itaque culpa corporis qui sequi odio vero! Ullam
          officia veritatis nisi et ratione blanditiis ex amet. Illum deleniti
          unde porro excepturi voluptate sapiente distinctio sit eum quis quod,
          earum fugiat?
        </div>
        <CommentsContainer />
      </article>
      <div className="w-full md:w-[40%] mt-[52px]">
        <SuggestedPosts
          header="Latest Articles"
          postData={postData}
          tags={tagsData}
        />
        <div className="mt-7">
          <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
            Share on:
          </h2>
          {/* <SocialShareButtons
            url={encodeURI(window.location.href)}
            title={encodeURIComponent(data?.title)}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default ArticleDetails;
