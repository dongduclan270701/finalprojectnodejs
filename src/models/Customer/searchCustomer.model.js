import { getDB } from '*/config/mongodb.js'

const getSearchGoods = async (data) => {
    try {
        console.log(data)
        // const filteredCategory = data.category.filter(Boolean)
        const result = await getDB().collection(data.collection.toLowerCase().replace(/ /g, '')).aggregate([
            {
                $match: {
                    nameProduct: { $regex: new RegExp(data.nameProduct, 'i') },
                    category: data.category.length > 0 ? { $all: [data.category] } : { $exists: true },
                    _destroy: false
                }
            }
        ]).toArray()
        const resultTotal = await getDB().collection(data.collection.toLowerCase().replace(/ /g, '')).aggregate([
            {
                $match: {
                    nameProduct: { $regex: new RegExp(data.nameProduct, 'i') },
                    category: data.category.length > 0 ? { $all: [data.category] } : { $exists: true },
                    _destroy: false
                }
            }
        ]).toArray()
        return { data: [...result], total: resultTotal.length }
    } catch (error) {
        throw new Error(error)
    }
}

const getFilterGoods = async (data) => {
    try {
        const filteredCategory = data.category.filter(Boolean)
        if (data.sort === 'none') {
            const result = await getDB().collection(data.collection.toLowerCase().replace(/ /g, '')).aggregate([
                {
                    $match: {
                        category: filteredCategory.length > 0 ? { $all: filteredCategory } : { $exists: true },
                        nowPrice: {
                            $gte: data.minPrice * 1,
                            $lte: data.maxPrice * 1
                        },
                        _destroy: false
                    }
                }
            ]).toArray()
            const resultTotal = await getDB().collection(data.collection.toLowerCase().replace(/ /g, '')).aggregate([
                {
                    $match: {
                        category: filteredCategory.length > 0 ? { $all: filteredCategory } : { $exists: true },
                        nowPrice: {
                            $gte: data.minPrice * 1,
                            $lte: data.maxPrice * 1
                        },
                        _destroy: false
                    }
                }
            ]).toArray()
            return { data: [...result], total: resultTotal.length };
            
        } else {
            const result = await getDB().collection(data.collection.toLowerCase().replace(/ /g, '')).aggregate([
                {
                    $match: {
                        category: filteredCategory.length > 0 ? { $all: filteredCategory } : { $exists: true },
                        nowPrice: {
                            $gte: data.minPrice * 1,
                            $lte: data.maxPrice * 1
                        },
                        _destroy: false
                    }
                },
                {
                    $sort: { nowPrice: data.sort === 'asc' ? 1 : -1 }
                }
            ]).toArray()
            const resultTotal = await getDB().collection(data.collection.toLowerCase().replace(/ /g, '')).aggregate([
                {
                    $match: {
                        category: filteredCategory.length > 0 ? { $all: filteredCategory } : { $exists: true },
                        nowPrice: {
                            $gte: data.minPrice * 1,
                            $lte: data.maxPrice * 1
                        },
                        _destroy: false
                    }
                }
            ]).toArray()
            return { data: [...result], total: resultTotal.length };
        }

    } catch (error) {
        throw new Error(error)
    }
}
export const searchGoodsModel = {
    getSearchGoods,
    getFilterGoods
}