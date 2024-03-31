import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Header";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";

const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div>
        <div>
          <Heading label={"Sign up"} />

          <SubHeading label={"Enter your information to create an account"} />

          <InputBox placeholder="avi" label={"First Name"} />
          <InputBox placeholder="yoo" label={"Last Name"} />
          <InputBox placeholder="avi@gmail.com" label={"Email"} />
          <InputBox placeholder="1234" label={"Password"} />

          <div className="mt-3">
            <Button label={"sign up"} />
          </div>

          <BottomWarning
            label={"Already have an account?"}
            buttontext={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
export default Signup;
