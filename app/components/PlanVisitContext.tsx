"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface PlanVisitContextType {
  isOpen: boolean;
  selectedGathering: string;
  openPlanVisitModal: (gathering?: string) => void;
  closePlanVisitModal: () => void;
}

const PlanVisitContext = createContext<PlanVisitContextType | undefined>(undefined);

export function PlanVisitProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGathering, setSelectedGathering] = useState("sundayService");

  const openPlanVisitModal = (gathering?: string) => {
    if (gathering) {
      setSelectedGathering(gathering);
    } else {
      setSelectedGathering("sundayService");
    }
    setIsOpen(true);
  };

  const closePlanVisitModal = () => {
    setIsOpen(false);
  };

  return (
    <PlanVisitContext.Provider
      value={{
        isOpen,
        selectedGathering,
        openPlanVisitModal,
        closePlanVisitModal,
      }}
    >
      {children}
    </PlanVisitContext.Provider>
  );
}

export function usePlanVisit() {
  const context = useContext(PlanVisitContext);
  if (!context) {
    throw new Error("usePlanVisit must be used within a PlanVisitProvider");
  }
  return context;
}
