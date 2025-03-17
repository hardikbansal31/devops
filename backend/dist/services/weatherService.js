"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const axios_1 = __importDefault(require("axios"));
class WeatherService {
    constructor() {
        this.apiKey = process.env.WEATHER_API_KEY || '';
        this.baseUrl = 'http://api.openweathermap.org/data/2.5';
    }
    getWeather(city) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`;
            const response = yield axios_1.default.get(url);
            const data = response.data;
            const forecastUrl = `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
            const forecastResponse = yield axios_1.default.get(forecastUrl);
            const forecastData = forecastResponse.data.list.slice(0, 5).map((item) => ({
                date: item.dt_txt,
                temperature: item.main.temp,
                description: item.weather[0].description,
                icon: item.weather[0].icon,
            }));
            return {
                city: data.name,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                forecast: forecastData,
            };
        });
    }
}
exports.WeatherService = WeatherService;
