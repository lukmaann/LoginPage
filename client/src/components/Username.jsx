import { Link } from "react-router-dom";
import Avatar from "../assets/profile.png";
import Styles from "../styles/username.module.css";


const Username = () => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center h-screen">
        <div className={Styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold">Hello Again!</h4>
            <span className="text-gray-500  text-l text-center py-3 w-2/3">
              Explore more by connecting with Us
            </span>
          </div>
          <form className="py-1">
            <div className="profile flex justify-center py-4">
              <img className={Styles.profile_img} src={Avatar} alt="Avatar" />
            </div>
            <div className="textbox flex flex-col justify-center items-center gap-3">
              <input type="text" className={Styles.textbox} placeholder="Username" />
              <button className={Styles.btn} type="submit">Lets Go</button>
            </div>
            <div className="text-center py-3">
              <span>
                Not a Member?{" "}
                <Link to="/register" className=" text-red-500 font-medium">
                  register
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;
