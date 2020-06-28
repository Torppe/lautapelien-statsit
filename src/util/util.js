const formatDate = (input) => {
    if (!input)
        return null

    var date = new Date(input)
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}

export default {
    formatDate
}