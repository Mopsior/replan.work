import { RectangleSkeleton } from './input'

export const ListItemSkeleton = () => {
    return [0, 1, 2].map((_, index) => (
        <RectangleSkeleton key={`skeleton-${index}`} className='h-10 w-full' />
    ))
}
