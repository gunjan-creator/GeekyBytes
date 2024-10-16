const ProfilePost = ({ p }) => {
  return (
    <div className="w-full flex mt-8 space-x-8 flex-row">
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img className="h-full w-full object-cover" src={p.photo} alt="" />
      </div>
      <div className="flext flex-col  w-[65%]">
        <h1 className="text-xl font-bold mb-1 md:mb-2 md:text-2xl ">
          {p.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb:4">
          <p>@{p.username}</p>
          <div className="flex  space-x-2">
            <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {p.desc.slice(0, 200)}{" "}
          <span className="text-blue-500 text-sm md:text-lg ">
            ...Read more
          </span>
        </p>
      </div>
    </div>
  );
};
export default ProfilePost;
