const App = Vue.createApp({
    data() {
        return {
            textUIs: [
            ],
        }
    },
    methods: {
        onMessage(event) {
            if (event.data.type == "showTextUI") {
                if (typeof event.data.id != 'string' && typeof event.data.key && typeof event.data.message != 'string') return
                
                const exist = this.textUIs.some(ui => ui.id === event.data.id);

                if(!exist) {
                    this.textUIs.push({
                        id: event.data.id,
                        key: event.data.key,
                        message: event.data.message
                    });

                } else {
                    return
                }
            } else if (event.data.type == 'hideTextUI') {
                this.textUIs = this.textUIs.filter(ui => ui.id !== event.data.id);
            } else if (event.data.type = 'getTextUIs') {
                const uiIds = this.textUIs.map(ui => ui.id);
                fetch(`https://${GetParentResourceName()}/returnTextUIs`, {
                    method: 'POST',
                    body: JSON.stringify(uiIds)
                });
            }
        },
    },
    async mounted() {
        window.addEventListener('message', this.onMessage);
    }
}).mount('#app');