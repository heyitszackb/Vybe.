export const Error = () => {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <p className="text-sm text-muted-foreground">
                Hey, we don't feel comfortable creating a playlist from that prompt. Go ahead and try something else!
            </p>
        </div>
    )
}