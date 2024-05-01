// ./models/subscriber.js
"use strict";

/**
 * @TODO: Listing 14.3 (p. 206)
 * 스키마 정의
 */
const mongoose = require("mongoose"),
    subscriberSchema = mongoose.Schema({
        name: String,
        email: String,
        phone: Number,
        newsletter: Boolean
    });

// Subscriber 모델 내보내기
module.exports = mongoose.model(
    "Subscriber", 
    subscriberSchema
);
