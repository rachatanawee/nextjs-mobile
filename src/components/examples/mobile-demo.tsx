"use client";

import { useState } from "react";
import { useSwipe, useHaptic, usePullToRefresh, useNetwork, useIsMobile } from "@/hooks";
import { Skeleton, Sheet, SheetContent, Spinner, Toast } from "@/components/ui";

export function MobileDemo() {
  const [showSheet, setShowSheet] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { vibrate } = useHaptic();
  const { isOnline } = useNetwork();
  const isMobile = useIsMobile();

  useSwipe({
    onSwipeLeft: () => {
      vibrate(10);
      console.log("Swiped left");
    },
    onSwipeRight: () => {
      vibrate(10);
      console.log("Swiped right");
    },
  });

  const { isRefreshing } = usePullToRefresh(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowToast(true);
  });

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Mobile Features Demo</h2>

      <div className="rounded-lg border p-4">
        <p>Network: {isOnline ? "🟢 Online" : "🔴 Offline"}</p>
        <p>Device: {isMobile ? "📱 Mobile" : "💻 Desktop"}</p>
      </div>

      {isRefreshing && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}

      <button
        onClick={() => {
          vibrate(10);
          setShowSheet(true);
        }}
        className="w-full rounded-lg bg-primary p-4 text-white"
      >
        Open Bottom Sheet
      </button>

      <button
        onClick={() => {
          vibrate([10, 50, 10]);
          setShowToast(true);
        }}
        className="w-full rounded-lg bg-secondary p-4"
      >
        Show Toast
      </button>

      <div className="space-y-2">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>

      <Sheet open={showSheet} onOpenChange={setShowSheet}>
        <SheetContent>
          <h3 className="text-lg font-bold">Bottom Sheet</h3>
          <p>This is a mobile-friendly bottom sheet component.</p>
          <button
            onClick={() => setShowSheet(false)}
            className="mt-4 w-full rounded-lg bg-primary p-3 text-white"
          >
            Close
          </button>
        </SheetContent>
      </Sheet>

      {showToast && (
        <Toast
          message="Action completed!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="rounded-lg bg-muted p-4 text-sm">
        <p className="font-bold">Try these:</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>Pull down to refresh</li>
          <li>Swipe left/right (check console)</li>
          <li>Tap buttons for haptic feedback</li>
          <li>Toggle network in DevTools</li>
        </ul>
      </div>
    </div>
  );
}
