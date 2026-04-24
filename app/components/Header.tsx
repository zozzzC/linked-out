import Image from "next/image";
import linkedOutLogo from "../../public/linkedout.png";

export default async function Header() {
  return (
    <div className="h-12 flex items-center">
      <div className="w-40 flex items-center bg-amber-50">
        <Image src={linkedOutLogo} alt="linked out logo"></Image>
      </div>
    </div>
  );
}
