import Ember from 'ember';
import AWS from 'npm:aws-sdk';
import config from '../../config/environment';

export default Ember.Controller.extend({

 accessKeyId: config.aws.accessKeyId,
 secretAccessKey: config.aws.secretAccessKey,
 entry : {},

  actions: {
    sendReport(){
      console.log('Sending report');
      const submittedForm = {
        name: 'Name',
        email: 'raghavslk@gmail.com',
        company: 'Frontier',
        phone: '1212343234',
        message: this.get('entry').email,
        details: this.get('entry').endDate,
        timestamp: new Date().getTime()
      };

      const emailParams = {
        Destination: { ToAddresses: [ 'raghavslk@gmail.com' ] },
        Message: {
          Body: { Text: {
            Data: `${submittedForm.name} asks ${submittedForm.message}. You can contact them by email ${submittedForm.email} or phone ${submittedForm.phone}`,
            Charset: 'UTF-8' } },
          Subject: { Data: 'Contact Form', Charset: 'UTF-8' }
        },
        ReplyToAddresses: [submittedForm.email],
        Source: `raghavslk@gmail.com`, // this has to be verified email in SES
      };
      const ses = new AWS.SES({
      apiVersion: '2010-12-01',
      accessKeyId: this.get('accessKeyId'),
      secretAccessKey: this.get('secretAccessKey'),

      "region": "us-west-2"
    });
      ses.sendEmail(emailParams, function(error, data) {
        if (error) {
           console.log(error);
        } else {
           console.log('Report sent successfully');
        }
      });

      console.log(submittedForm);
      console.log(ses);
    }
  }
});
