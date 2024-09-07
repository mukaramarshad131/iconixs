export const capitalizeFirstLetter = (str: string) => {
    if (!str) return '';
    const str2 = str.split('-')
    return str2.map((item:string)=>(item.charAt(0).toUpperCase() + item.slice(1))).join(' ')
  };