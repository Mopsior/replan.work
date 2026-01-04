export const ClerkWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full mt-20 flex justify-center items-center'>
            {children}
        </div>
    )
}