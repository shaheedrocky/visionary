import { resend, sender } from "../lib/resend.js";
import { createVisionaryWelcomeEmail } from "./emailTemplate.js";

export const emailSender = async (email, name, clientUrl) => {
    // Use your verified email in test mode (development)
   
    try {
        const { data, error } = await resend.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: email,
            subject: "Welcome to Visionary!",
            html: createVisionaryWelcomeEmail(name, clientUrl),
        });

        if (error) {
            console.log("Error from email sender: ", error);
            throw new Error("Failed to send mail to user.");
        }

        console.log("Welcome email sent successfully! ", data);
    } catch (err) {
        console.log(`Failed to send email to ${name}`, err);
        throw err;
    }
};