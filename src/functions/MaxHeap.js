function insert(heap, value) {
  var data = heap.map(function (val) {
    return val;
  });
  // add node to heap on the last node tree
  data.push(value);
  var valueIndex = data.length - 1;
  var checkedInsertedValueWithParents = false;
  // check the inserted value against its parents until its not bigger than the parent
  while (!checkedInsertedValueWithParents) {
    if (valueIndex === 0) {
      checkedInsertedValueWithParents = true;
    } else {
      var parentIndex = Math.floor((valueIndex - 1) / 2);
      var parent_1 = data[parentIndex];
      // if parent is smaller than value swap them
      if (parent_1 < value) {
        data[parentIndex] = value;
        data[valueIndex] = parent_1;
        //update indexes
        valueIndex = parentIndex;
      } else {
        checkedInsertedValueWithParents = true;
      }
    }
  }
  return data;
}
function peek(heap) {
  return heap[0];
}
function deleteNode(heap, nodeIndexToDelete) {
  var data = heap.map(function (val) {
    return val;
  });
  var lastNodeIndex = data.length - 1;
  var checkedTreeForBalancing = false;
  if (nodeIndexToDelete === heap.length - 1) {
    data.pop();
  } else {
    // swap delete index with root
    var lastNodeValue = data[lastNodeIndex];
    // switch node to delete with the last leaf node in the tree
    data[nodeIndexToDelete] = lastNodeValue;
    data[lastNodeIndex] = data[nodeIndexToDelete];
    // delete last node
    data.pop();
    var parentIndex = nodeIndexToDelete;
    while (!checkedTreeForBalancing) {
      var parentLeftNodeIndex = 2 * parentIndex + 1;
      var parentRightNodeIndex = 2 * parentIndex + 2;
      var parent_2 = data[parentIndex];
      var leftNode = data[parentLeftNodeIndex];
      var rightNode = data[parentRightNodeIndex];
      var switchParentWithChildNode =
        leftNode > parent_2 || rightNode > parent_2;
      if (switchParentWithChildNode) {
        var switchParentWithLeftNode = leftNode > rightNode;
        if (switchParentWithLeftNode) {
          data[parentIndex] = leftNode;
          data[parentLeftNodeIndex] = parent_2;
          parentIndex = parentLeftNodeIndex;
        } else {
          data[parentIndex] = rightNode;
          data[parentRightNodeIndex] = parent_2;
          parentIndex = parentRightNodeIndex;
        }
      } else {
        checkedTreeForBalancing = true;
      }
    }
  }
  return data;
}

const toAdd = [90, 89, 72, 36, 75, 70, 65, 21, 18, 15, 12, 63];

console.log("before: ", toAdd);
const deletedRootOnce = deleteNode(toAdd, 0);
console.log("delete index 0: ", deletedRootOnce);

const deletedRootSecond = deleteNode(deletedRootOnce, 0);
console.log("delete index 0: ", deletedRootSecond);

// export { insert, peek };
/*
   index from 0
    i left = 2*i+1
    i right = 2*i+2
    i parent = Math.floor((i-1)/2)
    */
