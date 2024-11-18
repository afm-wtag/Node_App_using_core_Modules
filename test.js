let count = 0;
let success = 0;
const failed = [];
const recipients = [
  { name: "Bart", email: "bart@tld" },
  { name: "Marge", email: "marge@tld" },
  { name: "Homer", email: "homer@tld" },
  { name: "Lisa", email: "lisa@tld" },
  { name: "Maggie", email: "maggie@tld" },
];

function dispatch(recipient, callback) {
  // `sendEmail` is a hypothetical SMTP client
  sendMail(
    {
      subject: "Dinner tonight",
      message: "We have lots of cabbage on the plate. You coming?",
      smtp: recipient.email,
    },
    callback
  );
}

function final(result) {
  console.log(`Result: ${result.count} attempts \
      & ${result.success} succeeded emails`);
  if (result.failed.length)
    console.log(`Failed to send to: \
        \n${result.failed.join("\n")}\n`);
}

recipients.forEach(function (recipient) {
  dispatch(recipient, function (err) {
    if (!err) {
      success += 1;
    } else {
      failed.push(recipient.name);
    }
    count += 1;

    if (count === recipients.length) {
      final({
        count,
        success,
        failed,
      });
    }
  });
});
