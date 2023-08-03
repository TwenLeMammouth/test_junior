const { sendEmail } = require('./emailer');
const { scores, emails } = require('./data');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const notifyOfExamResults = () => {
  let message = ""
  let wrongEmails = [];
  let mail = "";
  scores.forEach(score => {
    emails.forEach(email => {
      if(email.name == score.name) {
        mail = email.email
        if(score.score > 50) {
          message = `Congratulations ${capitalizeFirstLetter(score.name)}, you passed your exams with ${score.score}%!`
        } else {
          message = `Bad luck ${capitalizeFirstLetter(score.name)}, you failed your exams with ${score.score}%.`
        }
      }
    })
    let fonction = sendEmail(mail, message)
    if(!fonction) {
      wrongEmails.push(mail)
    }
  })
  return wrongEmails;
};

module.exports = notifyOfExamResults;
