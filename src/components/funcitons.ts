export const capitalizeFirstLetter = (str: string) => {
    if (!str) return '';
    const str2 = str.split('-')
    return str2.map((item:string)=>(item.charAt(0).toUpperCase() + item.slice(1))).join(' ')
  };

  export const extractQuestionsAndAnswers = (html: string) => {
      const arr = html?.split('<b>Question:')
      const questionsAndAnswers = arr?.slice(1).map((part, index) => {
        // Split the part further to avoid address-related content
        const [questionPart, ...answerParts] = part.split('<br>');
          console.log(questionPart)
        // Extract the answer and ensure it's not mixing with addresses or other data
        const answer = answerParts.join(' ')
          .split('<b>')[0] // Splitting before any other <b> tag, like <b>address:
          .trim().split(':')?.filter((key, index)=>((index+1)%2===0));
    
        return {[('q'+(index+1))]:answer};
      });

    return questionsAndAnswers?.reduce((acc, current) => {
      return { ...acc, ...current };
    }, {});;
  };

  export const convertHeight = (input: string) => {
    const feetInchesRegex = /(\d+)ft\s*(\d+)in/; // Matches "Xft Yin"
    const inchesRegex = /^\d+$/; // Matches just inches

    // Convert from "Xft Yin" to total inches
    const convertToInches = (feet: any, inches: any) => (feet * 12) + inches;

    // Convert from total inches to "Xft Yin"
    const convertToFeetInches = (totalInches: any) => {
      const feet = Math.floor(totalInches / 12);
      const inches = totalInches % 12;
      return `${feet}ft ${inches}in`;
    };
    if (feetInchesRegex.test(input)) {
      const matches = input.match(feetInchesRegex);
      if (matches) { // Check if matches is not null
        const feet = parseInt(matches[1], 10);
        const inches = parseInt(matches[2], 10);
        return `${convertToInches(feet, inches)}`; // Return total inches
    }
    } else if (inchesRegex.test(input)) {
      const totalInches = parseInt(input, 10);
      return convertToFeetInches(totalInches); // Return as "Xft Yin"
    } else {
      return "0";
    }
};
