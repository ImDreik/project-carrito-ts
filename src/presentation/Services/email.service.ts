import nodemailer, { Transporter } from 'nodemailer'


export interface SendEmailOptions {
    to: string | string[]
    subject: string
    html: string
    attachements?: Attachement[]
}

export interface Attachement {
    filename: string,
    path: string
}

export class EmailService {

    private transporter: Transporter;


    constructor(
        mailerService: string,
        mailerEmail: string,
        senderEmailPassword: string,
        private readonly postToProvider: boolean
    ) {
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: senderEmailPassword
            }
        })
    }


    async sendEmail(options: SendEmailOptions): Promise<boolean> {

        const { to, subject, html, attachements = []} = options

        try {
            
            if(!this.postToProvider) return true;

            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: html,
                attachments: attachements,
            });

            return true;

        } catch (error) {
            return false
        }


    }



}