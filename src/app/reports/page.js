"use client";
import ComingSoon from "../../components/comingSoon";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
function ReportsPage() {
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.user == null || user.user.error) {
      router.push("/login");
    }
  }, [user]);
  return (
    <section>
      <ComingSoon />
    </section>
  );
}

export default ReportsPage;
