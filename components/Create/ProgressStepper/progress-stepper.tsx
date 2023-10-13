"use client";

import { useCreatePage } from "@/app/(dashboard)/(routes)/create/CreatePageContext";

export const ProgressStepper = () => {
    const { currentPage } = useCreatePage();

    return(
        <div className="">
            Progress Stepper.
            Current page: {currentPage}
        </div>
    )

}