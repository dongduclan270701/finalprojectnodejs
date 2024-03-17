import { getDB } from '*/config/mongodb.js'

const laptopCollectionName = 'laptop'

// const getFullLaptopInformation = async (src) => {
//     try {
//         await getDB().collection(laptopCollectionName).findOneAndUpdate(
//             { src: src },
//             { $inc: { view: 1 } },
//             { returnDocument: 'after' }
//         )
//         const result = await getDB().collection(laptopCollectionName).aggregate([
//             {
//                 $match: {
//                     src: src,
//                     _destroy: false
//                 }
//             }
//         ]).toArray()
//         return result[0] || { message: 'Not found product' }
//     } catch (error) {
//         throw new Error(error)
//     }
// }

const getFullLaptopInformation = async (src, data) => {
    try {
        await getDB().collection(data).findOneAndUpdate(
            { src: src },
            { $inc: { view: 1 } },
            { returnDocument: 'after' }
        )
        // Lấy ngày và tháng hiện tại
        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString()
        const now = `${year}-${month}-${day}`
        // const currentDate = new Date()
        // currentDate.setDate(7)
        // const now = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0')
        const result = await getDB().collection(data).aggregate([
            {
                $match: {
                    src: src,
                    _destroy: false
                }
            }
        ]).toArray()
        const value = result[0] || { message: 'Not found product' }
        // Tìm ngày hiện tại trong viewInYear
        const viewInYearIndex = value.viewInYear.findIndex(item => item.date === now)
        if (viewInYearIndex !== -1) {
            // Nếu ngày đã tồn tại, tăng giá trị view tương ứng
            value.viewInYear[viewInYearIndex].view += 1
        } else {
            // Nếu ngày chưa tồn tại, tạo một bản ghi mới
            value.viewInYear.push({ date: now, view: 1 })
        }

        const updateUser = await getDB().collection(data).findOneAndUpdate(
            { src: src },
            { $set: value },
            { returnDocument: 'after' }
        )
        return updateUser.value
    } catch (error) {
        throw new Error(error)
    }
};


const getBestLaptop = async () => {
    try {
        let perPage = 4
        const [
            resultBestLaptop,
            resultBestLaptopGaming,
            resultBestPcGaming,
            resultBestPcCreator,
            resultBestPcCompany,
            resultBestApple,
        ] = await Promise.all([
            getDB().collection('laptop').aggregate([
                {
                    $match: {
                        _destroy: false
                    }
                },
                {
                    $sort: { sold: -1 }
                }
            ]).limit(perPage).toArray(),
            getDB().collection('laptop-gaming').aggregate([
                {
                    $match: {
                        _destroy: false
                    }
                },
                {
                    $sort: { sold: -1 }
                }
            ]).limit(perPage).toArray(),
            getDB().collection('pc-gaming').aggregate([
                {
                    $match: {
                        _destroy: false
                    }
                },
                {
                    $sort: { sold: -1 }
                }
            ]).limit(perPage).toArray(),
            getDB().collection('pc-creator').aggregate([
                {
                    $match: {
                        _destroy: false
                    }
                },
                {
                    $sort: { sold: -1 }
                }
            ]).limit(perPage).toArray(),
            getDB().collection('pc-company').aggregate([
                {
                    $match: {
                        _destroy: false
                    }
                },
                {
                    $sort: { sold: -1 }
                }
            ]).limit(perPage).toArray(),
            getDB().collection('apple').aggregate([
                {
                    $match: {
                        _destroy: false
                    }
                },
                {
                    $sort: { sold: -1 }
                }
            ]).limit(perPage).toArray()
        ])
        return {
            resultBestLaptop,
            resultBestLaptopGaming,
            resultBestPcGaming,
            resultBestPcCreator,
            resultBestPcCompany,
            resultBestApple
        }

    } catch (error) {
        throw new Error(error)
    }
}

export const laptopCollectingCustomerModel = {
    getFullLaptopInformation,
    getBestLaptop
}