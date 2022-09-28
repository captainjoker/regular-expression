class ExpNodeError extends Error{
  constructor(...params){
    super(...params);
  }
  setErrorMsg(message){
    this.message = message;
  }
  getErrorMsg(){
    return this.message;
  }
}

module.exports = ExpNodeError;