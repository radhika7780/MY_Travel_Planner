// Mock Payment Controller

export const initiatePayment = (req, res) => {
    try {
        const { amount, currency = "INR" } = req.body;

        if (!amount) {
            return res.status(400).json({ message: 'Amount is required' });
        }

        // Mock response mimicking Razorpay order creation
        const mockOrder = {
            id: `order_${Date.now()}`,
            entity: "order",
            amount: amount * 100, // Amount in paisa
            amount_paid: 0,
            currency: currency,
            receipt: `receipt_${Date.now()}`,
            status: "created",
            attempts: 0,
            created_at: Math.floor(Date.now() / 1000),
        };

        res.status(200).json({
            message: 'Payment initiated successfully (Mock)',
            order: mockOrder
        });
    } catch (error) {
        res.status(500).json({ message: 'Error initiating payment', error: error.message });
    }
};

export const verifyPayment = (req, res) => {
    try {
        const { paymentId, orderId, signature } = req.body;

        // In a real scenario, we would verify the signature here.
        // For now, we assume success if IDs are present.

        if (!paymentId || !orderId) {
            return res.status(400).json({ message: 'Missing payment details' });
        }

        res.status(200).json({
            message: 'Payment verified successfully (Mock)',
            status: 'success',
            paymentId: paymentId
        });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying payment', error: error.message });
    }
};
