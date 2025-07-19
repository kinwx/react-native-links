import AsyncStorage from "@react-native-async-storage/async-storage";

const LINKS_STORAGE_KEY = 'app@links';

export interface LinkStorage {
    id: string,
    name: string,
    url: string,
    category: string
}

async function get(): Promise<Array<LinkStorage>> {
    const cached = await AsyncStorage.getItem(LINKS_STORAGE_KEY);

    const storage = cached ? JSON.parse(cached) : [];

    return storage;
}

async function save(newLink: LinkStorage): Promise<void> {
    try {
        const storage = await get();
        const updated = [...storage, newLink];

        await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
        throw error
    }
}

async function remove(id: string): Promise<void> {
    try {
        const storage = await get();

        const updated = storage.filter(link => link.id !== id);

        await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(updated))
    } catch (error) {
        throw error
    }
}

export const linkStorage = { get, save, remove };