function insert(heap: number[], value: number): number[] {
  const data = heap.map((val) => val);
  // add node to heap on the last node tree
  data.push(value);

  let valueIndex: number = data.length - 1;

  let checkedInsertedValueWithParents: boolean = false;

  // check the inserted value against its parents until its not bigger than the parent
  while (!checkedInsertedValueWithParents) {
    if (valueIndex === 0) {
      checkedInsertedValueWithParents = true;
    } else {
      const parentIndex: number = Math.floor((valueIndex - 1) / 2);
      const parent: number = data[parentIndex];

      // if parent is smaller than value swap them
      if (parent < value) {
        data[parentIndex] = value;
        data[valueIndex] = parent;

        //update indexes
        valueIndex = parentIndex;
      } else {
        checkedInsertedValueWithParents = true;
      }
    }
  }

  return data;
}

function peek(heap: number[]): number {
  return heap[0];
}

function deleteNode(heap: number[], nodeIndexToDelete: number): number[] {
  const data = heap.map((val) => val);
  const lastNodeIndex: number = data.length - 1;
  let checkedTreeForBalancing: boolean = false;

  if (nodeIndexToDelete === heap.length - 1) {
    data.pop();
  } else {
    // swap delete index with root
    const lastNodeValue = data[lastNodeIndex];

    // switch node to delete with the last leaf node in the tree
    data[nodeIndexToDelete] = lastNodeValue;
    data[lastNodeIndex] = data[nodeIndexToDelete];
    // delete last node
    data.pop();

    let parentIndex: number = nodeIndexToDelete;

    while (!checkedTreeForBalancing) {
      const parentLeftNodeIndex: number = 2 * parentIndex + 1;
      const parentRightNodeIndex: number = 2 * parentIndex + 2;

      const parent: number = data[parentIndex];
      const leftNode: number = data[parentLeftNodeIndex];
      const rightNode: number = data[parentRightNodeIndex];

      const switchParentWithChildNode = leftNode > parent || rightNode > parent;

      if (switchParentWithChildNode && rightNode ^ leftNode) {
        const switchParentWithLeftNode =
          (leftNode && leftNode > rightNode) || (leftNode && !rightNode);

        if (switchParentWithLeftNode) {
          data[parentIndex] = leftNode;
          data[parentLeftNodeIndex] = parent;
          parentIndex = parentLeftNodeIndex;
        } else {
          data[parentIndex] = rightNode;
          data[parentRightNodeIndex] = parent;
          parentIndex = parentRightNodeIndex;
        }
      } else {
        checkedTreeForBalancing = true;
      }
    }
  }

  return data;
}

/*
 const toAdd = [90, 89, 72, 36, 75, 70, 65, 21, 18, 15, 12, 63];
  
  console.log("before: ", toAdd);
  const deletedRootOnce = deleteNode(toAdd, 0);
  console.log("delete once index 0: ", deletedRootOnce);
  
  const deletedRootSecond = deleteNode(deletedRootOnce, 0);
  console.log("second: ", deletedRootSecond);
*/

const MaxHeap = { insert, peek, deleteNode };

export default MaxHeap;

/*  
   index from 0
    i left = 2*i+1
    i right = 2*i+2
    i parent = Math.floor((i-1)/2) 
    */
