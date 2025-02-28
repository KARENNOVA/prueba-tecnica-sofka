export const formatDateToDDMMYYYY = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day.padStart(2,"0")}/${month.padStart(2,"0")}/${year.padStart(4,"0")}`;
};

export const formatDateToYYYYMMDD = (dateString: string): string => {
    const [day, month, year] = dateString.split('/');
    return `${year.padStart(4,"0")}-${month.padStart(2,"0")}-${day.padStart(2,"0")}`;
};