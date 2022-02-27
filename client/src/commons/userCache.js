import { useLocalStorageValue } from '@mantine/hooks';
const cacheEmail = (value) =>
{
    const { email } = value;
    const { cache } = useUserCache();
    cache.set(email);
}