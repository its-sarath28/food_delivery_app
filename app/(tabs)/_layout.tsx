import { Redirect, Slot } from "expo-router";
import React from "react";

const TabsLayout = () => {
  const isAuthenticated: boolean = false;

  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return <Slot />;
};

export default TabsLayout;
