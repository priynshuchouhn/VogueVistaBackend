import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config()


const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET!);
export const createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'inr',
        });
        res.status(200).json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating PaymentIntent:', error);
        res.status(500).json({ error: 'Failed to create PaymentIntent' });
    }
}

