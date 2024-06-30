/**
 * Swap to indexes in an array.
 * @param arr - the array, which should be modified
 * @param index1 - the first index to swap
 * @param index2 - the second index to swap
 * @returns - the modified array
 */
export function swap<T>(arr: T[], index1: number, index2: number): T[] {
    const array = arr
    if (index1 >= 0 && index1 < array.length && index2 >= 0 && index2 < array.length) {
        // biome-ignore lint: because the index is defined
        const temp = array[index1]!;
        // biome-ignore lint: because the index is defined
        array[index1] = array[index2]!;
        array[index2] = temp;
    } else {
        console.error('Einer der angegebenen Indizes ist außerhalb des gültigen Bereichs.');
    }
    return array
}