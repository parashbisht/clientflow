"use client";

import { useState, type ReactNode } from "react";
import { cn } from "cn";

export interface KanbanColumn<TStatus extends string> {
  id: TStatus;
  label: string;
}

interface KanbanBoardProps<TStatus extends string, TItem extends { id: string }> {
  columns: KanbanColumn<TStatus>[];
  items: TItem[];
  getStatus: (item: TItem) => TStatus;
  onMove: (id: string, status: TStatus) => void;
  renderCard: (item: TItem, dragging?: boolean) => ReactNode;
}

function DraggableCard({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", id);
        e.dataTransfer.effectAllowed = "move";
      }}
      className="cursor-grab active:cursor-grabbing"
    >
      {children}
    </div>
  );
}

function Column<TStatus extends string>({
  column,
  count,
  children,
  onDropItem,
}: {
  column: KanbanColumn<TStatus>;
  count: number;
  children: ReactNode;
  onDropItem: (id: string) => void;
}) {
  const [over, setOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const id = e.dataTransfer.getData("text/plain");
        if (id) onDropItem(id);
      }}
      className={cn(
        "flex min-w-[260px] flex-1 flex-col rounded-lg border bg-card/40 transition-colors",
        over && "border-primary/50 bg-primary/5",
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b px-3 py-2.5">
        <p className="text-sm font-medium">{column.label}</p>
        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
          {count}
        </span>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-2.5">{children}</div>
    </div>
  );
}

export function KanbanBoard<TStatus extends string, TItem extends { id: string }>({
  columns,
  items,
  getStatus,
  onMove,
  renderCard,
}: KanbanBoardProps<TStatus, TItem>) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {columns.map((column) => {
        const columnItems = items.filter((item) => getStatus(item) === column.id);
        return (
          <Column
            key={column.id}
            column={column}
            count={columnItems.length}
            onDropItem={(id) => onMove(id, column.id)}
          >
            {columnItems.length === 0 ? (
              <p className="px-1 py-6 text-center text-xs text-muted-foreground">
                No items
              </p>
            ) : (
              columnItems.map((item) => (
                <DraggableCard key={item.id} id={item.id}>
                  {renderCard(item)}
                </DraggableCard>
              ))
            )}
          </Column>
        );
      })}
    </div>
  );
}