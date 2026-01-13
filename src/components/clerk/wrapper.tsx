export const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex h-dvh w-full justify-center not-md:items-center md:mt-20'>
            {children}
        </div>
    )
}
