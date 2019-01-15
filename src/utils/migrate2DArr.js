/**
 * Move a number inside a 2D arr
 * @param {Object} params
 * @param {Array} obj.arr - original arr
 * @param {Number} obj.ii - number entiry
 * @param {String} obj.opration - move up or down
 * 
 * @example
 * // [[1,2],[5,3],[4]]
 * migrate2DArr({
 *      arr:[[1,2],[5],[3,4]],
 *      ii: 3,
 *      opration: 'up',
 * });
 */
function migrate2DArr({arr, ii, opration}) {
    let iiIndex; // which arr is ii in
    let newIiIndex;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes(ii)) {
            iiIndex = i;
            newIiIndex = opration === 'up' ? iiIndex - 1 : iiIndex + 1
        }
    }

    
    // move number to destination
    const res = arr.map((ar, i) => {
        if (newIiIndex === i) return ar.concat(ii);
        if (iiIndex === i) return ar.filter(num => num !== ii);
        return ar;
    }).filter(el => el.length > 0);
    
    if (newIiIndex >= arr.length) res.push([ii]);
    if (newIiIndex < 0) res.unshift([ii]);
    
    return res;
}

module.exports = migrate2DArr;

// test
// console.log('up', migrate2DArr({arr:[[1,2],[5],[3,4]], ii:4, opration:'up'}));
// console.log('up up', migrate2DArr({arr:[[1,2],[5],[3,4]], ii:2, opration:'up'}));
// console.log('down', migrate2DArr({arr:[[1,2],[5],[3,4]], ii:5, opration:'down'}));
// console.log('down down', migrate2DArr({arr:[[1,2],[5],[3,4]], ii:4, opration:'down'}));