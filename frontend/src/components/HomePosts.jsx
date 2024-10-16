const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={post.photo} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="flext flex-col  w-[65%]">
        <h1 className="text-xl font-bold mb-1 md:mb-2 md:text-2xl ">
          {post.title}
        </h1>
        <div className="flex flex-col sm:flex-row sm:gap-4 mb-2 text-sm font-semibold text-gray-500 sm:items-center justify-between md:mb:4">
          <p>@{post.username}</p>
          <div className="flex flex-col sm:flex-row  sm:space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm text-wrap md:text-lg overflow-hidden">
          {post.desc.slice(0, 300)}
          <span className="text-blue-500 text-wrap"> ...Read more</span>
        </p>
      </div>
    </div>
  );
};
export default HomePosts;
