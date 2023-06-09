/* eslint-disable react/prop-types */
import { useState } from "react";
import Heart from "react-heart";
import { usePostStore, useUserStore } from "../../../store/store";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletepost } from "../../../helper/helper";
import { toast } from "react-hot-toast";
const Posts = (props) => {
  const loggedUser = useUserStore((state) => state.user);
  const delpost = usePostStore((state) => state.delPost);

  const [over, setOver] = useState(false);

  const { picturePath, likes, postUserId, id } = props;
  const likeCount = Object.keys(likes).length;

  const delPost = () => {
    const delpostpromise = deletepost(id);

    toast.promise(delpostpromise, {
      loading: "deleting",
      success: "Post deleted",
      error: "error",
    });

    delpostpromise.then(() => {
      delpost(id);
    });
  };

  return (
    <div
      onMouseOver={() => {
        setOver(true);
      }}
      onMouseOut={() => setOver(false)}
      className="h-[250px] w-[250px] m-1 rounded-lg rounded-t-sm border border-b-4 hover:border-black border-gray-500"
    >
      <div className="w-[100%] h-[85%]">
        <img src={picturePath} alt="" className="h-[100%] w-[100%] " />
      </div>
      <div className="px-1 flex items-center justify-between h-[15%]">
        <div className="flex">
          <Heart className="w-5 " onClick={() => {}} isActive={true} />
          <h1 className="text-black px-2">{likeCount}</h1>
        </div>
        
        {over && postUserId === loggedUser._id && (
          <DeleteIcon onClick={delPost} className="text-black hover:cursor-pointer" />
        )}
      </div>
    </div>
  );
};

export default Posts;
