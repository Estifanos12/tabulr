/**
 * Check if an array is multidimensional
 * @param {any[]} arr - The array to check
 * @returns {boolean} - True if the array is multidimensional, false otherwise
 */

export const isMultiDimensionalArray = (arr: any[]): boolean => {
    return arr[0].constructor === Array;
}

