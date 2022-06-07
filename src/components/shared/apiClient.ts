const API_BASE_URL = process.env.API_BASE_URL

const getVerificationQuestion = (questionId:string)=>{
  return fetch(`${API_BASE_URL}/get-verification-question/${questionId}`);
}

export default {getVerificationQuestion}