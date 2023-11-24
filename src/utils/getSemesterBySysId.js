const getSemesterBySysId = (sysId) => {
    const semester = sysId.charAt(1);
    const beginYear = sysId.split('b')[1];
    const endYear = parseInt(beginYear) + 1;
    return `Học kì ${semester} - Năm học ${beginYear} - ${endYear}`;
}

module.exports = { getSemesterBySysId }