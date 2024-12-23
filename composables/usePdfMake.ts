import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { Canvg } from "canvg";

pdfMake.vfs = pdfFonts.pdfMake?.vfs;

interface ImageGridItem {
  image: string;
  width?: number;
  height?: number;
  alignment: string;
  fit?: number[];
  margin: number[];
  cover?: {
    width: number;
    height: number;
  };
}

// Function to convert an image URL to Base64 format
const imageToBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = reject;
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
};

const svgToPngBase64 = async (svgElement: HTMLElement): Promise<string> => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }
  const svgString = new XMLSerializer().serializeToString(svgElement);

  // SVGni Canvasga chizish
  const v = Canvg.fromString(ctx, svgString);
  await v.render();

  // PNG Base64 oling
  return canvas.toDataURL("image/png");
};

const pageWidth = 520;

const collectImages = async (element: HTMLElement): Promise<any[]> => {
  const images: HTMLImageElement[] = [];
  element?.querySelectorAll("img").forEach((img: HTMLImageElement) => {
    images.push(img);
  });

  const base64Images = await Promise.all(
    images.map((img) =>
      imageToBase64(img.src)
        .then((base64) => ({
          base64,
          height: img.height,
          width: img.width,
        }))
        .catch((err) => {
          console.error("Failed to process image:", img.src, err);
          return null; // Handle error gracefully
        })
    )
  );

  return base64Images.filter(Boolean); // Remove any null results
};

const calcImageWidth = (imgList: any[], pageWidth: number) => {
  if (imgList.length === 1) return pageWidth;
  if (imgList.length === 2) return (pageWidth - 10) / 2;
  if (imgList.length >= 3) return (pageWidth - 5) / 3;
};
const calcImageHeight = (imgList: any[]) => {
  if (imgList.length === 1 || imgList.length === 2) return 250;
  if (imgList.length >= 3) return 120;
};

const renderImageGrid = (images: any[], pageWidth: number) => {
  const rows = [];
  let row: ImageGridItem[] = [];
  const imgWidth = calcImageWidth(images, pageWidth) || 0;
  const imgHeight = calcImageHeight(images) || 0;

  images.forEach((image, index) => {
    row.push({
      image: image.base64,
      alignment: images.length === 1 ? "center" : "left",
      height: imgHeight,
      fit: [imgWidth, imgHeight],
      margin: [0, 0, 5, 5],
    });
    if ((index + 1) % 3 === 0) {
      rows.push({ columns: row, columnGap: 5, alignment: "center" });
      row = [];
    }
  });
  if (row.length > 0) {
    rows.push({ columns: row, columnGap: 5 });
  }
  return rows;
};

// Function to map Tailwind CSS classes to PDFMake styles
const mapTailwindClassesToPdfMakeStyles = (classList: DOMTokenList) => {
  const styles: any = {};
  classList.forEach((className) => {
    switch (className) {
      case "text-center":
        styles.alignment = "center";
        break;
      case "font-bold":
        styles.bold = true;
        break;
      case "text-lg":
        styles.fontSize = 18;
        break;
      // Qo'shimcha Tailwind CSS sinflarini shu yerga kiritishingiz mumkin
      default:
        break;
    }
  });
  return styles;
};

export const usePdfMake = () => {
  const createPdf = async (
    htmlContent: HTMLElement,
    orientation: string = "portrait"
  ) => {
    const images = await collectImages(htmlContent);
    let renderedImagesCount = 0;
    const docDefinition: TDocumentDefinitions = {
      pageSize: "A4",
      pageOrientation: orientation as "landscape" | "portrait",
      content: [] as any,
      defaultStyle: {
        fontSize: 12,
        font: "Roboto",
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          // alignment: "center",
          margin: [0, 10, 0, 10],
        },
        p: {
          fontSize: 10,
          alignment: "justify",
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fillColor: "#F1F2F5",
          color: "black",
        },
      },
    };

    const parseElement = async (
      element: HTMLElement,
      parentStack: any[],
      images: HTMLElement[] = []
    ) => {
      const elementStyles = mapTailwindClassesToPdfMakeStyles(
        element.classList
      );
      switch (element.tagName) {
        case "P":
        case "p":
          parentStack.push({
            text: element.innerText,
            style: "p",
            ...elementStyles,
          });
          break;
        case "H1":
        case "H2":
        case "H3":
          parentStack.push({
            text: element.innerText,
            style: "header",
            ...elementStyles,
          });
          break;
        case "TABLE":
          const tableBody: any[] = [];
          element?.querySelectorAll("tr").forEach((row, rowIndex) => {
            const rowData: any[] = [];
            row?.querySelectorAll("td, th").forEach((cell) => {
              const cellData = { text: cell?.innerText };
              if (rowIndex === 0) {
                cellData["style"] = "tableHeader";
              }
              rowData.push(cellData);
            });
            tableBody.push(rowData);
          });
          parentStack.push({
            table: { body: tableBody },
            style: "tableExample",
            width: "auto",
            ...elementStyles,
          });
          break;

        case "IMG":
          renderedImagesCount++;
          if (
            images &&
            images.length > 0 &&
            renderedImagesCount === images.length
          ) {
            const imageGrid = await renderImageGrid(images, pageWidth); // Rasmlarni gridga aylantirish
            parentStack.push(...imageGrid);
          }
          break;

        case "A":
        case "a":
          parentStack.push({
            text: element.innerText,
            link: element.getAttribute("href"),
            color: "#007BFF",
            decoration: "underline",
            ...elementStyles,
          });
          break;
        case "SVG":
        case "svg":
          let width = element.getAttribute("width");
          width = width > pageWidth ? pageWidth : width;
          const height = element.getAttribute("height") || 250;
          const pngData = await svgToPngBase64(element);
          parentStack.push({
            image: pngData,
            fit: [pageWidth, height],
            ...elementStyles,
          });
          break;

        default:
          const stack = { stack: [], style: "p", ...elementStyles };
          parentStack.push(stack);
          for (const child of element.childNodes) {
            if (child.nodeType === Node.TEXT_NODE && child?.textContent) {
              stack.stack.push({ text: child?.textContent });
            } else if (child.nodeType === Node.ELEMENT_NODE) {
              await parseElement(child as HTMLElement, stack.stack, images);
            }
          }
      }
    };

    // Parse the HTML content
    await parseElement(htmlContent, docDefinition?.content, images);

    // Create and open the PDF
    pdfMake.createPdf(docDefinition).download();
  };

  return {
    createPdf,
  };
};
