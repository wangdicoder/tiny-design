import { useMemo } from 'react';

export type ItemHeightData = [key: React.Key, height: number, column?: number];

export type ItemPositions = Map<
  React.Key,
  {
    column: number;
    top: number;
  }
>;

export default function usePositions(
  itemHeights: ItemHeightData[],
  columnCount: number,
  verticalGutter: number,
): [ItemPositions, number] {
  return useMemo(() => {
    const columnHeights = new Array(columnCount).fill(0) as number[];
    const positions: ItemPositions = new Map();

    for (let i = 0; i < itemHeights.length; i += 1) {
      const [itemKey, itemHeight, itemColumn] = itemHeights[i];

      let targetColumn = itemColumn ?? columnHeights.indexOf(Math.min(...columnHeights));
      targetColumn = Math.min(targetColumn, columnCount - 1);

      const top = columnHeights[targetColumn];
      positions.set(itemKey, { column: targetColumn, top });

      columnHeights[targetColumn] += itemHeight + verticalGutter;
    }

    const totalHeight = Math.max(0, Math.max(...columnHeights) - verticalGutter);
    return [positions, totalHeight];
  }, [columnCount, itemHeights, verticalGutter]);
}
