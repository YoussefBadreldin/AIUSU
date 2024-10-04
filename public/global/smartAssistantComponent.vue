<template>
    <div>
        <!-- Smart Assistant Button -->
        <button id="smart-assistant-icon" @click="navigateToSmartAssistant">
            <i class="fas fa-robot"></i>
            <span><br />المساعد </span>
            <span>الشخصي</span>
        </button>

        <!-- Modal for Smart Assistant -->
        <div class="modal fade" id="smartAssistantModal" tabindex="-1" role="dialog"
            aria-labelledby="smartAssistantModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="smartAssistantModalLabel">Smart Assistant Chat</h5>
                        <button type="button" class="close" @click="closeModal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default {
    data() {
        return {
            isChatWindowVisible: false,
        };
    },
    methods: {
        navigateToSmartAssistant() {
            this.$router.push('/smartAssistant/'); // Navigate to /smartAssistant/
        },
        closeModal() {
            $('#smartAssistantModal').modal('hide');
        }
    },
        mounted() {
        window.scrollTo(0, 0);
    }
};
</script>

<style scoped>
#smart-assistant-icon {
    position: fixed;
    left: 0;
    font-size: 30px; /* Optional: font size */
    z-index: 1000; /* Ensure button is on top */
}

</style>
