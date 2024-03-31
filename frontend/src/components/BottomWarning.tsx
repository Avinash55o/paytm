import { Link } from "react-router-dom";
const BottomWarning = ({
  label,
  buttontext,
  to,
}: {
  label: string;
  buttontext: string;
  to: string;
}) => {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div>{label}</div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttontext}
      </Link>
    </div>
  );
};
export default BottomWarning;
