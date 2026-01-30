// Format currency to LKR
export const formatCurrency = (amount: number): string => {
    return `LKR ${amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
};

// Format date
export const formatDate = (date: string | Date | undefined): string => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};
