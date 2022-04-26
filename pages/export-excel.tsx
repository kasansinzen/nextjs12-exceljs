import { NextPage } from "next";
import ExportExcel from "../src/modules/home/ExportExcel";

const ExportExcelPage: NextPage = (props) => {
  return <ExportExcel {...props} />
}

export default ExportExcelPage;