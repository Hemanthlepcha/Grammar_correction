import React from "react";
import Image from "next/image";

 const ProfileCard = ({ name, role, path }) => {
  return (
    <div>
      <Image
        className=" h-[250px] w-[300px] object-top object-cover rounded-2xl"
        src={path}
        alt="team"
      />
      <div className="flex flex-col items-center ">
        <p className="text-2xl font-medium text-black pt-2">{name}</p>
        <p className="text-lg text-[#000000]">{role}</p>

      </div>
      
    </div>
  );
};

export default ProfileCard;
