import React from "react";
import AdminTemplate from "../plantillas/AdminTemplate";
import ReportesOrganismo from "../organismos/ReportesOrganismo";

const ReportesPage = () => {
  return (
    <AdminTemplate>
      <ReportesOrganismo />
    </AdminTemplate>
  );
};

export default ReportesPage;
