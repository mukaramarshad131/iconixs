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