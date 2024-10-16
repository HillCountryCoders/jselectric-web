import { Poppins } from "next/font/google";
import "./style.scss";
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "800"],
  subsets: ["latin"],
  style: ["normal"],
});
function ComingSoon() {
  return (
    <section className="coming-soon-wrap">
      <h1 className={poppins.className}>Module Coming Soon</h1>
      <p className={poppins.className}>
        This module is under development stay tuned to find out more
      </p>
    </section>
  );
}

export default ComingSoon;
