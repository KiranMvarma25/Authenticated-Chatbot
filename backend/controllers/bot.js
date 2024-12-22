const chatSchema = require('../model/botSchema');

exports.bot = async (req, resp) => {
    try {
        const { userMessage } = req.body;

        
        if (!userMessage || typeof userMessage !== 'string') {
            return resp.status(400).json({
                success: false,
                msg: 'Invalid input. Please provide a valid message.',
            });
        }

        
        const replies = {
            'hello': 'Hi there! How can I help you today?',
            'help': 'Sure, let me assist you with that. What do you need help with?',
            'faq': 'Here are some frequently asked questions:\n1. How to reset my password?\n2. How to contact support?\n3. How to track my order?',
            'how to reset my password': 'To reset your password, go to the login page and click on "Forgot Password." Follow the instructions to set a new password.',
            'how to contact support': 'You can contact support by emailing us at support@example.com or calling us at +1-800-123-4567.',
            'how to track my order': 'To track your order, go to the "Orders" section in your account and click on "Track Order" next to the relevant order.',
            'troubleshooting steps': 'Here are some common troubleshooting steps:\n1. Restart the application.\n2. Clear your browser cache.\n3. Check your internet connection.',
            'restart the application': 'To restart the application, close it completely and open it again.',
            'clear browser cache': 'To clear your browser cache, go to your browser settings, find "Clear Browsing Data," and select "Cache." Then click "Clear Data."',
            'check internet connection': 'Ensure that your device is connected to a stable Wi-Fi or mobile network. Try reconnecting or resetting your router if needed.',
            'goodbye': 'Goodbye! Have a great day!',
            'thank you': "You're welcome! Let me know if there's anything else I can help with.",
            'what is your name': 'I am your HelpDesk Chatbot, here to assist you with your queries.',
            'how do i create an account': 'To create an account, go to the signup page, fill in your details, and click on "Create Account." You will receive a confirmation email to activate your account.',
            'how do i delete my account': 'To delete your account, go to your account settings and select "Delete Account." Confirm your decision to proceed.',
        };

        const botReply = replies[userMessage.toLowerCase()] || "Sorry, I didn't understand that. Can you rephrase?";

        
        if (!req.user || !req.user.id) {
            return resp.status(403).json({
                success: false,
                msg: 'User not authenticated.',
            });
        }

        
        const chatEntry = await chatSchema.create({
            userMessage,
            botReply,
            Messages_Id: req.user.id,
            timestamp: new Date(),
        });

        resp.status(200).json({
            success: true,
            msg: 'Message processed successfully',
            reply: botReply,
            chatEntry,
        });
    } catch (err) {
        resp.status(500).json({
            success: false,
            msg: 'Internal Server Error',
        });
    }
};
