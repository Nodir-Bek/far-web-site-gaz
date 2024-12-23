
// if renaming number small or equal to 500; => renaming * 500
//  if renaming number small or equal to 2500; => renaming * 2500
//  if renaming number small or equal to 5000; => renaming * 1975
//  if renaming number small or equal to 10000; => renaming * 2275
//  if renaming number small or equal to 90000; => renaming * 2600

// export function gasCalculation(gasUsage:number, dataArray: any) {
//     if (typeof gasUsage !== "number" || gasUsage < 0) {
//         throw new Error("Please provide a valid positive number for gas usage.");
//     }

//     let cost = 0;

//     if (gasUsage > 10000) {
//         cost += (gasUsage - 10000) * 2600;
//         gasUsage = 10000;
//     }
//     if (gasUsage > 5000) {
//         cost += (gasUsage - 5000) * 2275;
//         gasUsage = 5000;
//     }
//     if (gasUsage > 2500) {
//         cost += (gasUsage - 2500) * 1950;
//         gasUsage = 2500;
//     }
//     if (gasUsage > 500) {
//         cost += (gasUsage - 500) * 1500;
//         gasUsage = 500;
//     }
//     if (gasUsage > 0) {
//         cost += gasUsage * 650;
//     }

//     return cost;
// }

//  implement this function 

const processLimits = (dataArray: any[]) => {
    return dataArray.map((item, index) => {
      const previousLimit = index > 0 ? dataArray[index - 1].limit : 0;
      return {
        ...item,
        limit: item.limit - previousLimit, // Преобразование лимита в разницу
      };
    });
  };
  export const gasCalculation = (gasUsage: number, dataArray: any[]) => {
    const processedData = processLimits(dataArray); // Преобразование лимитов
  
    let summ = [];
    let remainingGas = gasUsage;
  
    for (let i = 0; i < processedData.length; i++) {
      const { limit, price } = processedData[i];
      const gasForCurrentLimit = Math.min(remainingGas, limit);
  
      summ.push({
          limit,
          price,
          id: processedData[i].id,
        cost: gasForCurrentLimit * price,
        count: gasForCurrentLimit,
      });
  
      remainingGas -= gasForCurrentLimit;
  
      if (remainingGas <= 0) {
        break;
      }
    }
  
    return summ;
  };
  

  