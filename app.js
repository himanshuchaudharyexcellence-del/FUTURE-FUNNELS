document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // MOBILE NAVIGATION MENU TOGGLE
    // ----------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking any navigation link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ----------------------------------------------------
    // FAQ ACCORDION (SAFE WRAPPER)
    // ----------------------------------------------------
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    if (faqTriggers.length > 0) {
        faqTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const card = trigger.parentElement;
                const content = trigger.nextElementSibling;
                const isActive = card.classList.contains('active');

                // Collapse all other active FAQ cards
                document.querySelectorAll('.faq-card').forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('active');
                        otherCard.querySelector('.faq-content').style.maxHeight = null;
                    }
                });

                // Toggle current FAQ card
                if (isActive) {
                    card.classList.remove('active');
                    content.style.maxHeight = null;
                } else {
                    card.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        });
    }

    // ----------------------------------------------------
    // URL SEARCH PARAMETERS (PRE-FILL LOGIC FOR CONTACT PAGE)
    // ----------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const serviceSelect = document.getElementById('user-service');
    const messageTextarea = document.getElementById('user-message');

    if (contactForm && serviceSelect && messageTextarea) {
        // Parse search parameters
        const urlParams = new URLSearchParams(window.location.search);
        const focusParam = urlParams.get('focus');

        if (focusParam) {
            switch (focusParam.toLowerCase()) {
                case 'academy':
                    serviceSelect.value = 'Course Enrollment';
                    messageTextarea.value = 'Hello Future Funnels Team, I would like to enroll in the Cyber Scam Defense Academy ($99). Please provide me with the payment gateway options and onboarding details.';
                    break;
                case 'emergency':
                case 'solutions':
                    serviceSelect.value = 'Active Cyber Crime Solution';
                    messageTextarea.value = 'URGENT: I believe my digital accounts, systems, or assets have been compromised. I need to consult an active incident solution handler immediately.';
                    break;
                case 'prevention':
                    serviceSelect.value = 'Preventative Defense Setup';
                    messageTextarea.value = 'Hello, I want to audit my digital identities, passwords, and devices to prevent future attacks. Please let me know how we can set up a proactive security audit.';
                    break;
                case 'verification':
                    serviceSelect.value = 'Scam Audit Consultation';
                    messageTextarea.value = 'Hello, I have a suspicious entity, website link, or email request I want your team to verify. Here are the details: [Paste details or link here]';
                    break;
            }
            
            // Console log parameter activation for debugging
            console.log(`%c[Prefill Triggered] URL query parameter focus: ${focusParam}`, 'color: #00ff87; font-weight: bold;');
        }
    }

    // ----------------------------------------------------
    // WHATSAPP REDIRECTION FORM SUBMIT GATEWAY
    // ----------------------------------------------------
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract form inputs
            const name = document.getElementById('user-name').value.trim();
            const email = document.getElementById('user-email').value.trim();
            const phone = document.getElementById('user-phone').value.trim();
            const service = serviceSelect.value;
            const message = messageTextarea.value.trim();
            const consentChecked = document.getElementById('user-consent').checked;

            if (!consentChecked) {
                alert('Please authorize redirection to WhatsApp to proceed.');
                return;
            }

            // Target helpline: +91 9646851325
            const whatsappNumber = '919646851325';

            // Compile clean, structured message format
            const rawMessage = 
`🔴 *New Inquiry | Future Funnels*
---------------------------------------
👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *WhatsApp:* ${phone}
🎯 *Focus:* ${service}

💬 *Message:*
${message}
---------------------------------------
*Authorized via Web Portal Consent*`;

            const encodedMessage = encodeURIComponent(rawMessage);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Create submit state button visual spinner
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = `
                <span>Opening Secure Channel...</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                </svg>
            `;
            submitBtn.style.pointerEvents = 'none';

            // Add spinner rotation animation dynamically
            const styleSheet = document.styleSheets[0];
            const spinKeyframes = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .spin-icon {
                    animation: spin 1s linear infinite;
                }
            `;
            styleSheet.insertRule(spinKeyframes, styleSheet.cssRules.length);

            // Redirect user after short verification buffer
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                
                // Reset submit button state
                submitBtn.innerHTML = originalText;
                submitBtn.style.pointerEvents = 'auto';
                
                // Clear inputs
                contactForm.reset();
            }, 1200);
        });
    }

    // ----------------------------------------------------
    // SECURE BOOT LOG
    // ----------------------------------------------------
    console.log(
        '%c⚡ FUTURE FUNNELS MULTI-PAGE ENGINE ACTIVE ⚡',
        'color: #00e5ff; font-weight: bold; font-size: 14px; background-color: #070a13; padding: 8px 12px; border: 1px solid #00e5ff; border-radius: 4px;'
    );
});
