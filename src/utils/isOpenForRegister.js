const isOpenForRegister = (beginAt, endAt) => {
    const now = new Date(Date.now());
    return (now >= beginAt) && (now <= endAt);
}

module.exports = { isOpenForRegister }