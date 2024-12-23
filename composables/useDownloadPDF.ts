import { jsPDF } from "jspdf"; // jsPDF kutubxonasini import qiling
import html2canvas from "html2canvas";
export const useDownloadPDF = () => {
  const isLoading = ref<boolean>(false);

  const downloadPDF = async (
    pdfContent: any,
    fileName: string,
    refs: boolean = false
  ) => {
    let element;
    if (refs) {
      element = pdfContent.value.$refs.pdfRef;
    } else element = pdfContent.value;
    html2canvas(element).then((canvas) => {
      let doc = new jsPDF({
        orientation: "p",
        unit: "px",
        format: "a4",
      });
      doc.width = doc.internal.pageSize.width;
      doc.height = doc.internal.pageSize.height;
      doc.margin = {
        horiz: 15,
        vert: 20,
      };
      doc.work = {
        width: doc.width - doc.margin.horiz * 2,
        height: doc.height - doc.margin.vert * 2,
      };

      let data = {
        width: element.offsetWidth,
        height: element.offsetHeight,
        ctx: canvas.getContext("2d", { willReadFrequently: true }),
        page: {},
        willReadFrequently: true,
      };
      data.page.width = data.width;
      data.page.height = (data.width * doc.work.height) / doc.work.width;

      const getData = function (imgData, width, height) {
        let oCanvas = document.createElement("canvas");
        oCanvas.width = width;
        oCanvas.height = height;
        let oCtx = oCanvas.getContext("2d", { willReadFrequently: true });
        oCtx.putImageData(imgData, 0, 0);
        return oCanvas.toDataURL("image/png");
      };

      /**/
      let oImgData = null;
      let dataURL = null;
      let pages = Math.ceil(data.height / data.page.height);
      for (let i = 0; i < pages; i++) {
        if (i != 0) {
          doc.addPage();
        }
        oImgData = data.ctx.getImageData(
          0,
          data.page.height * i,
          data.page.width,
          data.page.height
        );
        dataURL = getData(oImgData, data.page.width, data.page.height);
        doc.addImage(
          dataURL,
          "PNG",
          doc.margin.horiz,
          doc.margin.vert,
          doc.work.width,
          doc.work.height
        );
      }
      /**/
      doc.save("" + setLength(fileName, 20) + ".pdf");
    });
  };
  return { downloadPDF, isLoading };
};
