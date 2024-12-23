export const useGeneratePdf = () => {
  const createPdf = async (htmlContent:HTMLElement, fileName:string) => {
    try {
        const response = await $fetch("/api/pdf", {
          method: "POST",
          body: { htmlContent: htmlContent?.outerHTML },
          responseType: "blob", // To handle binary response
        });
        const url = URL.createObjectURL(response as any);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${fileName}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
  }
  return { createPdf }
}