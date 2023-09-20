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
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1; // Tháng trong JavaScript được đếm từ 0
        const result = await getDB().collection(data).aggregate([
            {
                $match: {
                    src: src,
                    _destroy: false
                }
            }
        ]).toArray()
        const value = result[0] || { message: 'Not found product' };
        // Tìm ngày hiện tại trong viewInMonth
        const viewInMonthIndex = value.viewInMonth.findIndex(item => item.day === currentDay);
        if (viewInMonthIndex !== -1) {
            // Nếu ngày đã tồn tại, tăng giá trị view tương ứng
            value.viewInMonth[viewInMonthIndex].view += 1;
        } else {
            // Nếu ngày chưa tồn tại, tạo một bản ghi mới
            value.viewInMonth.push({ day: currentDay, view: 1 });
        }
        // Tìm tháng hiện tại trong viewInYear
        const viewInYearIndex = value.viewInYear.findIndex(item => item.month === currentMonth);
        if (viewInYearIndex !== -1) {
            // Nếu tháng đã tồn tại, tăng giá trị view tương ứng
            value.viewInYear[viewInYearIndex].view += 1
        } else {
            // Nếu tháng chưa tồn tại, tạo một bản ghi mới
            value.viewInYear.push({ month: currentMonth, view: 1 })
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