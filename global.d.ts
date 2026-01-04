// When other files will be added, you don't need to change these imports. It's only to proivde keys
import messages from './messages/pl.json';

declare module 'next-intl' {
    interface AppConfig {
        Messages: typeof messages;
    }
}