
import { reactive, computed } from 'vue'
const loaderSet = reactive(new Set<string>());
const loading = computed(() => loaderSet.size > 0);

export const useLoader = () => {
    const uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
 

    const start = () => {
        loaderSet.add(uuid);
    }

    const stop = () => {
        loaderSet.delete(uuid);
    }

    return {
        start, 
        stop, 
        loading
    }
}