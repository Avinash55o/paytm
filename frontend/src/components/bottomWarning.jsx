import React from "react";
import { Link } from "react-router-dom";
const BottomWarning=({label,buttontext,to})=>{
  return <div className="py-2 text-sm flex justify-center">
    <div>
      {label}
    </div>
    <Link className="pointer underline pl-1 cursor-pointer" to={to}>{buttontext}</Link>
  </div>
}
export default BottomWarning;

// export function bottomWarning({ label, buttontext, to }) {
//   return (
//     <div>
//       <div>{label}</div>
//       <Link className="" to={to}>{buttontext} </Link>
//     </div>   
//   );
// }
