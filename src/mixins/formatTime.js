export default {
    methods: {
        timeAgo(createdTime) {
            const now = new Date().getTime();
            const milliseconds = now - new Date(createdTime).getTime();
            const seconds = Math.floor(milliseconds / 1000) % 60;
            const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
            const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
            const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)) % 30;
            const months = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 30)) % 12;
            const years = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 30 * 12));

            return `${years ? `${years} yil ` : months ? `${months} oy ` : days ? `${days} kun ` : hours ? `${hours} soat` : minutes ? `${minutes} daqiqa ` : `${seconds} soniya`} oldin`;
        }
    }
}
