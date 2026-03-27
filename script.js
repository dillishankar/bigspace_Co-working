// 1. INITIALIZE EMAILJS
(function () {
    // Matches your provided Public Key
    emailjs.init("5rZcaouq7MemCzsCZ");
})();

// 2. DATA OBJECT FOR THE 5 CARDS
const roomEmailContent = {
    "G1 (Ground Floor)": `Room Name: G1 (Ground Floor)
Facilities Available:
• 1 Fan
• Air Conditioning (AC)
• 6 Tables
• 6 Rolling Chairs
Board: Whiteboard
This space is suitable for team work, meetings, or small office setups.`,

    "G2 (Ground Floor Premium)": `Room Name: G2 (Ground Floor Premium)
Facilities Available:
• 2 Air Conditioners
• 8 Tables
• 8 Ergonomic Chairs
• High-speed WiFi
Board: Glass Board
This space is ideal for growing teams and premium office setups.`,

    "F1 (First Floor)": `Room Name: F1 (First Floor)
Facilities Available:
• 1 Air Conditioner
• 4 Tables
• 4 Chairs
• Power Backup
Board: Whiteboard
This space is suitable for startups and small teams.`,

    "F2 (Conference Room)": `Room Name: F2 (Conference Room)
Facilities Available:
• Air Conditioning (AC)
• 10 Seater Conference Table
• Projector
• Video Conferencing Setup
Board: Whiteboard
This space is perfect for meetings, presentations, and client discussions.`,

    "F3 (Private Cabin)": `Room Name: F3 (Private Cabin)
Facilities Available:
• Air Conditioning (AC)
• 2 Tables
• 3 Chairs
• Storage Cabinet
Board: Pin Board
This space is ideal for individuals or small private offices.`
};

// 3. SELECT ELEMENTS
const modal = document.getElementById('roomModal');
const modalTitle = document.getElementById('modalTitle');
const visitorEmailInput = document.getElementById('visitorEmail');
const requestForm = document.getElementById('requestForm');
const successMsg = document.getElementById('successMessage');

// 4. MODAL OPEN LOGIC
document.querySelectorAll('.space-card').forEach(card => {
    card.addEventListener('click', () => {
        // Reset modal state
        requestForm.style.display = 'block';
        successMsg.style.display = 'none';
        visitorEmailInput.value = '';

        document.getElementById('modalImg').src = card.getAttribute('data-img');
        modalTitle.innerText = card.getAttribute('data-title');
        document.getElementById('modalDesc').innerText = card.getAttribute('data-desc');

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// 5. MODAL CLOSE LOGIC (Fixes the Close Button)
const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });
});

// Close if user clicks outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// 6. EMAIL SENDING LOGIC
document.getElementById('sendRequestBtn').addEventListener('click', function () {
    const emailValue = visitorEmailInput.value;
    const selectedRoom = modalTitle.innerText;
    const btn = this;

    if (emailValue === "" || !emailValue.includes('@')) {
        alert("Please enter a valid email address!");
        return;
    }

    btn.innerText = "Sending...";
    btn.disabled = true;

    const specificDetails = roomEmailContent[selectedRoom] || "Details for this room are coming soon.";

    // These keys match your dashboard: {{user_email}} and {{room_details}}
    const templateParams = {
        user_email: emailValue,
        room_details: specificDetails
    };

    // IDs from your latest Dashboard screenshots
    const myServiceID = 'service_60xupfj';
    const myTemplateID = 'template_a7gdfym'; // Updated to match your current active template ID

    emailjs.send(myServiceID, myTemplateID, templateParams)
        .then(() => {
            requestForm.style.display = 'none';
            successMsg.style.display = 'block';
            btn.disabled = false;
            btn.innerText = "Request Details";
        }, (error) => {
            alert("Failed to send: " + (error.text || JSON.stringify(error)));
            btn.disabled = false;
            btn.innerText = "Request Details";
        });
});

// 7. SHOW MORE / SHOW LESS LOGIC
const showMoreBtn = document.getElementById('showMoreBtn');
const hiddenCards = document.querySelectorAll('.hidden-card');
let isExpanded = false;

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        hiddenCards.forEach(card => {
            card.style.display = isExpanded ? 'block' : 'none';
            card.style.opacity = isExpanded ? '1' : '0';
        });
        showMoreBtn.innerText = isExpanded ? 'Show Less' : 'Show More';
    });
}







const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');
const icon = menuIcon.querySelector('i');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Toggle between Hamburger and X
    if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
        document.body.style.overflow = 'hidden'; // Prevents scrolling behind menu
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
        document.body.style.overflow = 'auto';
    }
});

// Close menu when clicking any link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        icon.classList.replace('fa-times', 'fa-bars');
        document.body.style.overflow = 'auto';
    });
});