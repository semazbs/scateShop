import {$authHost, $host} from "./index";
export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}
  
export const deleteItem = async (deviceId) => {
    try {
        const { data } = await $authHost.delete(`api/device`, {
            params: { id: deviceId }, // Передаем id через params
        });
        return data;
    } catch (error) {
        console.error("Ошибка удаления товара:", error.response?.data?.message || error.message);
        throw error;
    }
};


export const getItems = async (typeId, brandId, page, limit= 5) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}
