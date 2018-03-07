import VulcanEmail from 'meteor/vulcan:email';


VulcanEmail.addEmails({
  orderPaidTemplate: {
    template: "orderPaid",
    path: "/email/order-paid",
    data(variables) {
      return {name: variables.name}
    },
    subject(data) {
      const user = data.name;
      return `${user}, your order has been received.`;
    },
    testVariables: {name: "User"}
  }

});


