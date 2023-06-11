"use client";

import { ShowMoreProps } from "@/types";
import { useRouter } from "next/navigation";
import CustomeButton from "./CustomeButton";
import { updateSearchParams } from "@/utils";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();

  const handleNavigtion = () => {
    const newLimt = (pageNumber + 1) *10;
    const newPathname = updateSearchParams('limit',`${newLimt}`);
    router.push(newPathname);
  }

  return (
    <div className="w-full flex-center gap-5 mt-10">
        {!isNext && (
            <CustomeButton 
                title="Show More"
                btnType="button"
                containerStyles="bg-primary-blue rounded-full text-white"
                handleClick={handleNavigtion}
            />
        )}
    </div>
  )
}

export default ShowMore