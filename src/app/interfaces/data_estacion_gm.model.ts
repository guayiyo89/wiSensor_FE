export class Data_estacion_gm{
    constructor(
        public data_time: string,
        public direction: number,
        public speed: number,
        public pressure: number,
        public relative_humidity: number,
        public temperature: number,
        public dewpoint: number,
        public total_precipitation: number,
        public precipitation_intensity: number,
        public solar_radiation: number,
        public gps_latitude: number,
        public gps_longitude: number,
        public gps_altitude: number,
        public supply_voltage: number,
        public device_id: string,
        public id?: string
    ) {}
}