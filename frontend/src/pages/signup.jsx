import BottomWarning from "../components/bottomWarning";
import Button from "../components/button";
import Heading from "../components/Header";
import SubHeading from "../components/subHeading";
import InputBox from "../components/Inputbox";

const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div>
        <div>
          <Heading lable={"Sign up"} />

          <SubHeading label={"Enter your information to create an account"} />

          <InputBox placeholder="avi" label={"First Name"} />
          <InputBox placeholder="yoo" label={"Last Name"} />
          <InputBox placeholder="avi@gmail.com" label={"Email"} />
          <InputBox placeholder="1234" label={"Password"} />

          <div>
            <Button label={"sign up"} />
          </div>

          {/* <BottomWarning
            label={"Already have an account?"}
            buttontext={"Sign in"}
            to={"/signin"}
          /> */}
        </div>
      </div>
    </div>
  );
};
export default Signup;
