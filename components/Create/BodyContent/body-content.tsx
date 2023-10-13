"use client";

import { useCreatePage } from "@/app/(dashboard)/(routes)/create/CreatePageContext";

export const BodyContent = () => {
    const { currentPage } = useCreatePage();

    return(
        <div className="">
            Nothing here yet! Enter a prompt to start vybing.
        </div>
    )

}