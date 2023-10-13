"use client";

import { useCreatePage } from "@/app/(dashboard)/(routes)/create/CreatePageContext";

export const MainInput = () => {
    const { currentPage } = useCreatePage();

    return(
        <div className="">
            Main Input.
        </div>
    )

}