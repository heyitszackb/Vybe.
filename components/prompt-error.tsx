import Image from "next/image"

interface PromptErrorProps {
    label: string;
}

export const PromptError = ({
    label
}: PromptErrorProps) => {
    return (
        <div className="h-3/6 flex flex-col items-center justify-center">
            <div className="relative h-72 w-72">
                <Image 
                    alt="Empty state image"
                    fill
                    src="/promptError.png"
                />
            </div>
            <p className="text-muted-foreground text-sm text-center">
                {label}
            </p>
        </div>
    )
}