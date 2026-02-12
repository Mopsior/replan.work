export const IS_MOBILE = '(max-width: 767px)'
export const IS_DESKTOP = '(min-width: 768px)'

export enum QueryKeys {
    USER_CALENDARS = 'user_calendars',
    USER_EVENTS = 'user_events',
}

export const COLOR_PALETTE = [
    { hex: 'FF0000', tailwind: 'bg-red-600' },
    { hex: '0EA5E9', tailwind: 'bg-sky-500' },
    { hex: '10B981', tailwind: 'bg-emerald-500' },
    { hex: 'F59E0B', tailwind: 'bg-amber-500' },
    { hex: '8B5CF6', tailwind: 'bg-violet-500' },
    { hex: 'EC4899', tailwind: 'bg-pink-500' },
    { hex: '422006', tailwind: 'bg-yellow-950' },
    { hex: '404040', tailwind: 'bg-neutral-700' },
] as const
