function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        if (tab.id === tabId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

function logout() {
    alert('Logging out...');
    // Add actual logout functionality here
}

function startLearning() {
    alert('Redirecting to learning section...');
    // Add redirection functionality here
}

function startTeaching() {
    alert('Redirecting to teaching section...');
    // Add redirection functionality here
}

function viewTestSeries(subject) {
    alert('Viewing ' + subject + ' test series...');
    // Add functionality to view test series here
}

function generateCareerSuggestions() {
    alert('Generating career suggestions based on your interests and skills...');
    // Add functionality to generate career suggestions here
}

function viewActivityHistory() {
    alert('Viewing activity history...');
    // Add functionality to view activity history here
}
// Classroom functionality

let localStream;
let remoteStream;
let peerConnection;

// Initialize WebRTC and setup video chat
async function initVideoChat() {
    const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
    peerConnection = new RTCPeerConnection(configuration);
    
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    document.getElementById('local-video').srcObject = localStream;

    peerConnection.addStream(localStream);

    peerConnection.onaddstream = (event) => {
        remoteStream = event.stream;
        document.getElementById('remote-video').srcObject = remoteStream;
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            // Send the ICE candidate to the remote peer
            console.log('New ICE candidate:', event.candidate);
        }
    };
}

// Toggle video stream (start/stop)
function toggleVideo() {
    const videoTrack = localStream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
}

// Chat functionality
function sendMessage() {
    const messageInput = document.getElementById('chat-input');
    const messageText = messageInput.value;
    if (messageText.trim() === '') return;

    const messageElement = document.createElement('div');
    messageElement.textContent = `You: ${messageText}`;
    document.getElementById('chat-messages').appendChild(messageElement);

    // Here you would send the message to the server and broadcast it to other users
    messageInput.value = '';
}

// Initialize the video chat on page load
document.addEventListener('DOMContentLoaded', (event) => {
    initVideoChat();
});
