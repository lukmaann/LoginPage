/* eslint-disable react/prop-types */

import { useState } from "react";
import Heart from "react-heart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import CommentBox from "../comment/CommentBox";
import { usePostStore, useUserStore } from "../../../store/store";
import { UpdateLikes } from "../../../helper/helper";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FeedPosts = (props) => {
  const { likes, caption, comments, postId, profile, firstName, picturePath } =
    props;
  const [clickComment, setClickComment] = useState(true);
  const likePost = usePostStore((state) => state.likePost);
  const navigate = useNavigate();

  const loggedUser = useUserStore((state) => state.user);
  let likeCount = Object.keys(likes).length;
  const isLiked = Boolean(likes[loggedUser._id]);
  const userId = loggedUser._id;

  const LikePost = () => {
    const data = UpdateLikes({ postId, userId });
    toast.promise(
      data,
      {
        success: isLiked ? "🥹" : "😁",
        loading: isLiked ? "Dislike?" : "like?",
        error: "Action abort",
      },
      {
        position: "bottom-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
    data.then((post) => {
      likePost(post);
    });
  };

  return (
    <div className="p-10 flex flex-wrap  ">
      <Toaster position="bottom-right" />
      

      <div className="w-[60vh] h-[100vh] m-8 border-b-4  border border-gray-600 drop-shadow-sm bg-white rounded-lg">
        <div className="w-[100%] h-16 flex  items-center p-4 ">
          <img
            src={profile}
            className="w-10 h-10 border-2  mr-4 border-gray-300 rounded-full "
            alt="profile img"
          />
          <button
            onClick={() => navigate("/user", { state: { id: firstName } })}
            className="font-bold font-sans hover:text-gray-500 cursor-pointer"
          >
            {firstName}{" "}
          </button>
        </div>
        <div className="h-[80%] w-[100%] border-b  border-gray-400 rounded-2xl flex text-white justify-center items-center">
          <img
            src={picturePath}
            className="h-[100%] select-none  border-gray-500 w-[100%]"
            alt=""
          />
        </div>
        <div className=" h-[10%]">
          <div className="flex  items-center h-[100%] justify-between px-5  min-w-fit">
            <Heart
              isActive={isLiked}
              onClick={LikePost}
              className="w-6 mt-2 ml-4"
            />
            <h2 className="  mt-1 text-sm w-fit  select-none">
                <span className="font-semibold ">
                  {likeCount} Likes
                </span>
              </h2>

            <FontAwesomeIcon
              icon={faComment}
              onClick={() => {
                setClickComment(!clickComment);
              }}
              className={
                clickComment
                  ? "mt-2 mx-3 text-2xl  text-gray-800 drop-shadow-sm"
                  : "mt-2 mx-3 text-2xl text-black"
              }
            />
          </div>
        </div>
      </div>
      <div className="w-[40%] ">
        <div className="mt-12 flex justify-center h-[20%]   overflow-hidden">
          <h1 className="text-base   bg-white w-[90%] h-28 overflow-y-auto border-black px-3 rounded-lg">
            {" "}
            <span className="text-gray-700 ">
              
              Caption :
            </span>{" "}
            {caption}
          </h1>
        </div>
        {clickComment && (
          <div className="w-[100%] h-[70%] flex justify-center">
            <CommentBox postId={postId} comments={comments} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPosts;
