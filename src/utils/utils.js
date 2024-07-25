const { AxiosError } = require('axios')

const convertAmountIntoCents = amount => {
    let res
    const numbers = amount.toFixed(2).toString().split('.')

    if (!numbers[1]) {
        res = Number(amount) * 100
    } else {
        const decimals = numbers[1].length === 2 ? numbers[1] : numbers[1] + '0'
        res = Number(numbers[0] + decimals)
    }

    return res
}

const getRandomBoolean = percent => {
    return Math.random() < percent / 100
}

const getErrorMessage = (e, customError) => {
    if (e instanceof Error) return e.message
    if (e instanceof AxiosError) return e.message
    if (customError) return customError
    return String(e)
}

// export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

const generateRandomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateRandomNumbers = numberLength => {
    let randomNumber = ''

    for (let i = 0; i < numberLength; i++) {
        const number = generateRandomNumber(9, 0)
        randomNumber = randomNumber + number
    }

    return randomNumber
}

const generateRandomString = () => {
    let result = ''
    const length = Math.floor(Math.random() * 50) + 1
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

module.exports = { convertAmountIntoCents, getRandomBoolean, getErrorMessage, generateRandomNumbers, generateRandomString }
