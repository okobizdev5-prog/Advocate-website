import React, { useEffect, useState } from 'react';
import image_1 from './assets/image_1.jpeg';
import image_2 from './assets/image_2.jpeg';
import image_3 from './assets/image_3.jpeg';
import image_4 from './assets/image_4.jpeg';
import image_5 from './assets/image_5.jpeg';
import image_6 from './assets/image_6.jpeg';
import image_7 from './assets/image_7.jpeg';

import gallery_1 from './assets/gallery_1.jpeg';
import gallery_2 from './assets/gallery_2.jpeg';
import gallery_3 from './assets/gallery_3.jpeg';
import gallery_4 from './assets/gallery_4.jpeg';
import gallery_5 from './assets/gallery_5.jpeg';
import gallery_6 from './assets/gallery_6.jpeg';
import gallery_7 from './assets/gallery_7.jpeg';
import gallery_8 from './assets/gallery_8.jpeg';
import gallery_9 from './assets/gallery_9.jpeg';
import gallery_10 from './assets/gallery_10.jpeg';
import gallery_11 from './assets/gallery_11.jpeg';
import gallery_12 from './assets/gallery_12.jpeg';
import gallery_13 from './assets/gallery_13.jpeg';
import gallery_14 from './assets/gallery_14.jpeg';
import gallery_15 from './assets/gallery_15.jpeg';

const galleryImages = [
    gallery_1, gallery_2, gallery_3, gallery_4, gallery_5,
    gallery_6, gallery_7, gallery_8, gallery_9, gallery_10,
    gallery_11, gallery_12, gallery_13, gallery_14, gallery_15
];

function App() {
    useEffect(() => {
        // Reveal Logic
        function reveal() {
            var reveals = document.querySelectorAll('.reveal');
            for (var i = 0; i < reveals.length; i++) {
                var windowHeight = window.innerHeight;
                var elementTop = reveals[i].getBoundingClientRect().top;
                var elementVisible = 150;
                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add('active');
                }
            }
        }
        window.addEventListener('scroll', reveal);
        reveal();

        // Accordion Logic
        const accordionItems = document.querySelectorAll('.accordion-item');
        const handleAccordionClick = function () {
            const content = this.querySelector('.accordion-content');
            const icon = this.querySelector('span');
            const isOpen = content.style.maxHeight !== '0px' && content.style.maxHeight !== '';

            // Close all others
            document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = '0px');
            document.querySelectorAll('.accordion-item span').forEach(i => i.style.transform = 'rotate(0deg)');

            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        };

        accordionItems.forEach(item => {
            item.addEventListener('click', handleAccordionClick);
        });

        // Counter Animation
        const observerOptions = {
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-target'));
                    let count = 0;
                    const duration = 2000;
                    const increment = countTo / (duration / 16);

                    const updateCount = () => {
                        count += increment;
                        if (count < countTo) {
                            target.innerText = Math.floor(count) + (target.innerText.includes('%') ? '%' : '+');
                            requestAnimationFrame(updateCount);
                        } else {
                            target.innerText = countTo + (target.innerText.includes('%') ? '%' : '+');
                        }
                    };
                    updateCount();
                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.counter').forEach(counter => counterObserver.observe(counter));

        return () => {
            window.removeEventListener('scroll', reveal);
            accordionItems.forEach(item => {
                item.removeEventListener('click', handleAccordionClick);
            });
        };
    }, []);
    // Form Submit State
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "Corporate Law",
        message: ""
    });
    const [status, setStatus] = useState({
        submitting: false,
        success: null,
        message: ""
    });

    // Gallery Slider & Lightbox State
    const [currentSlide, setCurrentSlide] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [visibleCount, setVisibleCount] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setVisibleCount(3);
            } else if (window.innerWidth >= 768) {
                setVisibleCount(2);
            } else {
                setVisibleCount(1);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const maxSlide = galleryImages.length - visibleCount;
        if (currentSlide > maxSlide) {
            setCurrentSlide(maxSlide >= 0 ? maxSlide : 0);
        }
    }, [visibleCount, currentSlide]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (lightboxIndex === null) return;
            if (e.key === 'ArrowRight') {
                setLightboxIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
            } else if (e.key === 'ArrowLeft') {
                setLightboxIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
            } else if (e.key === 'Escape') {
                setLightboxIndex(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex]);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev >= galleryImages.length - visibleCount ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? galleryImages.length - visibleCount : prev - 1));
    };

    const closeLightbox = () => setLightboxIndex(null);

    const lightboxPrev = (e) => {
        e.stopPropagation();
        setLightboxIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    };

    const lightboxNext = (e) => {
        e.stopPropagation();
        setLightboxIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({
            submitting: true,
            success: null,
            message: ""
        });

        const payload = {
            access_key: "3271adb5-232f-4540-a634-01de66f15683",
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            subject: `New Consultation Request: ${formData.subject}`,
            message: formData.message
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();

            if (result.success) {
                setStatus({
                    submitting: false,
                    success: true,
                    message: 'Thank you! Request sent successfully.'
                });
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    subject: "Corporate Law",
                    message: ""
                });
            } else {
                setStatus({
                    submitting: false,
                    success: false,
                    message: "Something went wrong. Please try again."
                });
            }
        } catch (error) {
            setStatus({
                submitting: false,
                success: false,
                message: error.message || "Network error. Please try again."
            });
        }
    };


    return (
        <>
            {/* TopNavBar */}
            <nav className="w-full top-0 sticky z-50 bg-surface border-b border-outline-variant/10">
                <div className="flex justify-between items-center h-20 px-margin-x max-w-container-max mx-auto">
                    <div className="flex items-center gap-4">
                        <span className="hidden lg:block font-headline-sm text-secondary uppercase tracking-widest text-[20px]">The
                            Legal Care</span>
                    </div>
                    <div className="hidden md:flex items-center gap-stack-lg font-body-md text-body-md uppercase tracking-widest">
                        <a className="text-on-surface-variant hover:text-secondary transition-colors duration-300"
                            href="#services">Practice Areas</a>
                        <a className="text-on-surface-variant hover:text-secondary transition-colors duration-300"
                            href="#about">About Me</a>
                        <a className="text-on-surface-variant hover:text-secondary transition-colors duration-300"
                            href="#testimonials">Insights</a>
                        <a className="text-on-surface-variant hover:text-secondary transition-colors duration-300"
                            href="#contact">Contact</a>
                    </div>
                    <a className="bg-secondary text-on-secondary-fixed px-8 py-3 font-label-caps uppercase transition-all duration-300 hover:brightness-110 shadow-lg shadow-secondary/10"
                        href="#contact">
                        Consultation
                    </a>
                </div>
            </nav>
            {/* Hero Section */}
            <header className="relative min-h-[90vh] flex items-center overflow-hidden bg-primary-container">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div
                        className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent">
                    </div>
                </div>
                <div className="max-w-container-max mx-auto px-margin-x grid lg:grid-cols-2 gap-16 items-center">
                    <div className="z-10 order-2 lg:order-1">
                        <div className="inline-block px-4 py-1 mb-6 border border-secondary/30 bg-secondary/5">
                            <span className="text-secondary font-label-caps uppercase">Professional Excellence</span>
                        </div>
                        <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-on-background mb-4">
                            Advocate <span className="text-secondary">Muhammad Feroz Alam</span>
                        </h1>
                        <div className="mb-8 max-w-lg border-l-2 border-secondary/40 pl-5 space-y-3">
                            <div className="space-y-1">
                                <p className="font-headline-sm text-on-surface-variant/90 leading-relaxed">
                                    Ex-Legal Advisor, <span className="text-secondary/80 font-semibold">Intraco Group</span>
                                </p>
                                <p className="font-headline-sm text-on-surface-variant/90 leading-relaxed">
                                    Legal Advisor, <span className="text-secondary/80 font-semibold">L.G Butterfly Marketing
                                        Limited</span>
                                </p>
                            </div>
                            <div
                                className="flex flex-wrap items-center gap-x-2 gap-y-1 text-on-surface-variant/70 text-sm tracking-widest uppercase font-medium">
                                <span>M.S.S</span>
                                <span className="text-secondary/50">•</span>
                                <span>L.L.B</span>
                                <span className="text-secondary/50">•</span>
                                <span>M.A</span>
                                <span className="text-secondary/50">•</span>
                                <span>L.L.M</span>
                                <br />
                                <span className="text-secondary/50">•Advocate Dhaka Judge Court <br />(Civil,Criminal Trade Mark,Tax
                                    vat,Company <br />Legal Advisor)</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-stack-md">
                            <a className="px-10 py-4 bg-secondary text-on-secondary-fixed font-label-caps uppercase font-bold transition-all hover:scale-105 shadow-xl shadow-secondary/10"
                                href="#contact">
                                Book Consultation
                            </a>
                            <a className="px-10 py-4 border border-on-background text-on-background font-label-caps uppercase font-bold transition-all hover:bg-on-background/10"
                                href="#contact">
                                Contact Now
                            </a>
                        </div>
                    </div>
                    <div className="relative order-1 lg:order-2">
                        <div className="relative z-10 aspect-[4/5] overflow-hidden border-[1px] border-secondary/20 group">
                            <img alt="Advocate Muhammad Feroz Alam"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                src={image_1} />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent">
                            </div>
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l-2 border-b-2 border-secondary/40 z-0"></div>
                        <div className="absolute -top-6 -right-6 w-32 h-32 border-r-2 border-t-2 border-secondary/40 z-0"></div>
                    </div>
                </div>
            </header>
            {/* Stats Section */}
            <section className="py-16 bg-surface-container-lowest border-y border-outline-variant/10">
                <div className="max-w-container-max mx-auto px-margin-x grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="font-headline-md text-secondary mb-1 counter" data-target="500">500+</div>
                        <div className="font-label-caps text-on-surface-variant uppercase">Cases Handled</div>
                    </div>
                    <div>
                        <div className="font-headline-md text-secondary mb-1 counter" data-target="15">15+</div>
                        <div className="font-label-caps text-on-surface-variant uppercase">Years Experience</div>
                    </div>
                    <div>
                        <div className="font-headline-md text-secondary mb-1 counter" data-target="450">450+</div>
                        <div className="font-label-caps text-on-surface-variant uppercase">Satisfied Clients</div>
                    </div>
                    <div>
                        <div className="font-headline-md text-secondary mb-1 counter" data-target="98">98%</div>
                        <div className="font-label-caps text-on-surface-variant uppercase">Success Rate</div>
                    </div>
                </div>
            </section>
            {/* About Section */}
            <section className="py-section-padding bg-surface" id="about">
                <div className="max-w-container-max mx-auto px-margin-x">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="reveal">
                            <h2 className="font-headline-md text-on-background mb-8 relative">
                                A Legacy of <span className="text-secondary italic">Justice</span>
                                <span className="absolute -bottom-4 left-0 w-16 h-1 bg-secondary"></span>
                            </h2>
                            <p className="font-body-lg text-on-surface-variant mb-6">
                                Advocate Muhammad Feroz Alam
                                <br />
                                <br />
                                I am a distinguished legal professional with extensive experience in
                                litigation, corporate advisory, and regulatory matters. He holds advanced academic credentials,
                                including M.S.S., LL.B., M.A., and LL.M., reflecting a strong foundation in legal and social
                                sciences.

                                Throughout his career, he has served as Legal Advisor to leading organizations, including
                                Intraco Group and L.G. Butterfly Marketing Limited, providing strategic legal counsel on a wide
                                range of corporate and commercial matters.

                                As an Advocate of the Dhaka Judge Court, he represents clients across diverse areas of law,
                                including Civil Litigation, Criminal Law, Trademark Matters, Tax & VAT Law, Company Law, and
                                Corporate Legal Advisory Services. Known for his professionalism, integrity, and client-centered
                                approach, Advocate Muhammad Feroz Alam is committed to delivering effective legal solutions and
                                safeguarding the interests of his clients with diligence and excellence.

                            </p>

                            <div className="grid grid-cols-2 gap-stack-lg">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-secondary"
                                        style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
                                    <div>
                                        <h4 className="font-body-md font-bold text-on-background">Ethical Practice</h4>
                                        <p className="text-sm text-on-surface-variant">Upholding the highest standards of the bar.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-secondary"
                                        style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                                    <div>
                                        <h4 className="font-body-md font-bold text-on-background">Legal Security</h4>
                                        <p className="text-sm text-on-surface-variant">Protecting your interests across
                                            jurisdictions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative reveal">
                            <div className="aspect-square bg-cover bg-center border border-outline-variant shadow-2xl"
                                data-alt="A modern, high-end legal office interior with dark wood paneling, marble floors, and a sophisticated library of law books in the background. The lighting is moody and professional, highlighting the texture of the mahogany desk and leather chairs."
                                style={{ backgroundImage: `url(${image_2})` }}>
                            </div>
                            <div className="absolute -bottom-28 -right-10 z-20 bg-secondary p-10 hidden lg:block shadow-lg">
                                <span className="block text-on-secondary-fixed font-headline-sm italic pt-8">"Justice is the
                                    constant and
                                    perpetual will to allot to every man his due."</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Services Section (Bento Grid Style) */}
            <section className="py-section-padding bg-surface-container-low" id="services">
                <div className="max-w-container-max mx-auto px-margin-x">
                    <div className="text-center mb-16 reveal">
                        <h2 className="font-headline-md text-on-background mb-4 uppercase tracking-wider">Strategic Practice Areas
                        </h2>
                        <div className="w-24 h-[1px] bg-secondary mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1 */}
                        <div className="glass-card p-8 group">
                            <span className="material-symbols-outlined text-secondary mb-6 text-4xl">account_balance</span>
                            <h3 className="font-headline-sm text-on-background mb-3">Civil Law</h3>
                            <p className="text-sm text-on-surface-variant mb-6">Expert litigation and dispute resolution for complex
                                civil matters.</p>
                            <a className="text-secondary font-label-caps uppercase flex items-center gap-2 group-hover:gap-4 transition-all"
                                href="#">Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
                        </div>
                        {/* Card 2 */}
                        <div className="glass-card p-8 group">
                            <span className="material-symbols-outlined text-secondary mb-6 text-4xl">gavel</span>
                            <h3 className="font-headline-sm text-on-background mb-3">Criminal Law</h3>
                            <p className="text-sm text-on-surface-variant mb-6">Strategic defense and representation for corporate
                                and private entities.</p>
                            <a className="text-secondary font-label-caps uppercase flex items-center gap-2 group-hover:gap-4 transition-all"
                                href="#">Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
                        </div>
                        {/* Card 3 */}
                        <div className="glass-card p-8 group">
                            <span className="material-symbols-outlined text-secondary mb-6 text-4xl">receipt_long</span>
                            <h3 className="font-headline-sm text-on-background mb-3">Tax Law</h3>
                            <p className="text-sm text-on-surface-variant mb-6">Sophisticated fiscal planning, tax advisory, and
                                representation before tax authorities.</p>
                            <a className="text-secondary font-label-caps uppercase flex items-center gap-2 group-hover:gap-4 transition-all"
                                href="#">Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
                        </div>

                        {/* Card 8 */}
                        <div className="glass-card p-8 group">
                            <span className="material-symbols-outlined text-secondary mb-6 text-4xl">business_center</span>
                            <h3 className="font-headline-sm text-on-background mb-3">Company Legal Advisor</h3>
                            <p className="text-sm text-on-surface-variant mb-6">Bespoke legal audits and strategic counsel for
                                proactive protection.</p>
                            <a className="text-secondary font-label-caps uppercase flex items-center gap-2 group-hover:gap-4 transition-all"
                                href="#">Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
                        </div>
                    </div>
                </div>
            </section>
            {/* Why Choose Us */}
            <section className="py-section-padding bg-surface">
                <div className="max-w-container-max mx-auto px-margin-x">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2 reveal">
                            <h2 className="font-headline-md text-on-background mb-10">Distinctive <span
                                className="text-secondary">Excellence</span></h2>
                            <ul className="space-y-8">
                                <li className="flex gap-6 group">
                                    <div
                                        className="w-12 h-12 flex-shrink-0 bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:bg-secondary group-hover:text-on-secondary-fixed transition-all duration-300">
                                        <span className="material-symbols-outlined">groups</span>
                                    </div>
                                    <div>
                                        <h4 className="font-body-lg font-bold text-on-background mb-1">Experienced Legal
                                            Professional</h4>
                                        <p className="text-on-surface-variant">Providing trusted legal counsel and dedicated
                                            representation with professionalism, integrity, and a commitment to achieving the
                                            best outcomes for clients.</p>
                                    </div>
                                </li>
                                <li className="flex gap-6 group">
                                    <div
                                        className="w-12 h-12 flex-shrink-0 bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:bg-secondary group-hover:text-on-secondary-fixed transition-all duration-300">
                                        <span className="material-symbols-outlined">lock</span>
                                    </div>
                                    <div>
                                        <h4 className="font-body-lg font-bold text-on-background mb-1">Confidential Service</h4>
                                        <p className="text-on-surface-variant">Absolute discretion for all legal matters, guaranteed
                                            by attorney-client privilege.</p>
                                    </div>
                                </li>
                                <li className="flex gap-6 group">
                                    <div
                                        className="w-12 h-12 flex-shrink-0 bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:bg-secondary group-hover:text-on-secondary-fixed transition-all duration-300">
                                        <span className="material-symbols-outlined">person_pin</span>
                                    </div>
                                    <div>
                                        <h4 className="font-body-lg font-bold text-on-background mb-1">Client-Focused Approach</h4>
                                        <p className="text-on-surface-variant">Bespoke strategies tailored to your specific
                                            commercial or personal objectives.</p>
                                    </div>
                                </li>
                                <li className="flex gap-6 group">
                                    <div
                                        className="w-12 h-12 flex-shrink-0 bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:bg-secondary group-hover:text-on-secondary-fixed transition-all duration-300">
                                        <span className="material-symbols-outlined">bolt</span>
                                    </div>
                                    <div>
                                        <h4 className="font-body-lg font-bold text-on-background mb-1">Fast Response</h4>
                                        <p className="text-on-surface-variant">Urgent matters handled with immediate priority and
                                            clear communication.</p>
                                    </div>
                                </li>
                                <li className="flex gap-6 group">
                                    <div
                                        className="w-12 h-12 flex-shrink-0 bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:bg-secondary group-hover:text-on-secondary-fixed transition-all duration-300">
                                        <span className="material-symbols-outlined">military_tech</span>
                                    </div>
                                    <div>
                                        <h4 className="font-body-lg font-bold text-on-background mb-1">Proven Success Record</h4>
                                        <p className="text-on-surface-variant">A legacy of high-profile wins and successful
                                            multi-million dollar settlements.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="lg:w-1/2 reveal">
                            <div className="relative p-12 bg-surface-container-high border border-secondary/10">
                                <div className="absolute top-0 right-0 p-8">
                                    <span
                                        className="material-symbols-outlined text-6xl text-secondary/10 select-none">format_quote</span>
                                </div>
                                <h3 className="font-headline-sm text-secondary mb-6">Our Philosophy</h3>
                                <p className="font-body-lg italic text-on-background leading-relaxed mb-8">
                                    "Legal counsel is not just about understanding the law; it's about navigating the human and
                                    commercial complexities that define every case. We provide the clarity and strength needed
                                    to achieve optimal outcomes."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-[1px] bg-secondary"></div>
                                    <span className="font-label-caps uppercase tracking-widest text-on-surface-variant">Principal
                                        Solicitor</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* The Chamber */}
            <section className="py-section-padding bg-surface" id="chamber">
                <div className="max-w-container-max mx-auto px-margin-x">
                    <div className="text-center mb-16 reveal">
                        <span className="text-secondary font-label-caps uppercase tracking-widest mb-2 block">Prestigious
                            Environment</span>
                        <h2 className="font-headline-md text-on-background uppercase tracking-wider">The Chamber</h2>
                        <div className="w-24 h-[1px] bg-secondary mx-auto mt-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Large Feature: Boardroom */}
                        <div className="md:col-span-2 md:row-span-2 relative overflow-hidden border border-secondary/10 group">
                            <img alt="Luxurious Boardroom"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                src={image_3} />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                <p className="text-secondary font-label-caps uppercase">Executive Boardroom</p>
                            </div>
                        </div>
                        {/* Library */}
                        <div className="relative overflow-hidden border border-secondary/10 group aspect-square">
                            <img alt="Law Library"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                src={image_4} />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                <p className="text-secondary font-label-caps uppercase">Private Library</p>
                            </div>
                        </div>
                        {/* Reception */}
                        <div className="relative overflow-hidden border border-secondary/10 group aspect-square">
                            <img alt="Reception Area"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                src={image_5} />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                <p className="text-secondary font-label-caps uppercase">Courtroom</p>
                            </div>
                        </div>
                        {/* Team Discussion */}
                        <div
                            className="md:col-span-2 relative overflow-hidden border border-secondary/10 group h-full min-h-[320px]">
                            <img alt="Team Discussion"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                src={image_6} />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                <p className="text-secondary font-label-caps uppercase">Collaborative Strategy</p>
                            </div>
                        </div>
                        {/* Signing */}
                        <div className="relative overflow-hidden border border-secondary/10 group aspect-[2/3]">
                            <img alt="Signing Document"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                src={image_7} />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                <p className="text-secondary font-label-caps uppercase">Legal Precision</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Photo Gallery Section */}
            <section className="py-section-padding bg-surface-container-low" id="gallery">
                <div className="max-w-container-max mx-auto px-margin-x">
                    <div className="text-center mb-16 reveal">
                        <span className="text-secondary font-label-caps uppercase tracking-widest mb-2 block">Moments & Milestones</span>
                        <h2 className="font-headline-md text-on-background uppercase tracking-wider">Photo Gallery</h2>
                        <div className="w-24 h-[1px] bg-secondary mx-auto mt-4"></div>
                    </div>

                    <div className="relative group/slider px-4">
                        <div className="overflow-hidden">
                            <div 
                                className="flex transition-transform duration-500 ease-out"
                                style={{ transform: `translateX(-${currentSlide * (100 / visibleCount)}%)` }}
                            >
                                {galleryImages.map((img, index) => (
                                    <div 
                                        key={index}
                                        className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
                                    >
                                        <div 
                                            className="relative aspect-[4/3] overflow-hidden border border-secondary/10 group cursor-pointer bg-black/20"
                                            onClick={() => setLightboxIndex(index)}
                                        >
                                            <img 
                                                src={img} 
                                                alt={`Gallery Image ${index + 1}`} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <div className="w-12 h-12 rounded-full border border-secondary/35 flex items-center justify-center bg-background/80 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                    <span className="material-symbols-outlined text-secondary text-[24px]">visibility</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Slide Buttons */}
                        <button 
                            onClick={prevSlide}
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-secondary/20 bg-background/85 hover:bg-secondary hover:text-on-secondary-fixed transition-all duration-300 shadow-xl z-10 cursor-pointer"
                            aria-label="Previous image"
                        >
                            <span className="material-symbols-outlined text-[24px]">chevron_left</span>
                        </button>
                        <button 
                            onClick={nextSlide}
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-secondary/20 bg-background/85 hover:bg-secondary hover:text-on-secondary-fixed transition-all duration-300 shadow-xl z-10 cursor-pointer"
                            aria-label="Next image"
                        >
                            <span className="material-symbols-outlined text-[24px]">chevron_right</span>
                        </button>
                    </div>
                </div>
            </section>
            <section className="py-section-padding bg-surface-container-lowest" id="testimonials">
                <div className="max-w-container-max mx-auto px-margin-x">
                    <h2 className="font-headline-md text-center mb-16">Client <span className="text-secondary">Testimonials</span></h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="glass-card p-10 relative">
                            <div className="flex text-secondary mb-6">
                                <span className="material-symbols-outlined text-sm"
                                    style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-sm"
                                    style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-sm"
                                    style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-sm"
                                    style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-sm"
                                    style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            </div>
                            <p className="font-body-md text-on-surface-variant mb-8 italic">"Julian's insight into corporate law
                                saved our acquisition from a potential legal minefield. Truly a master of his craft."</p>
                            <div>
                                <p className="font-bold text-on-background">Arthur J. Sterling</p>
                                <p className="text-xs text-secondary font-label-caps uppercase">CEO, Sterling Holdings</p>
                            </div>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="glass-card p-10 relative border-t-2 border-t-secondary/40">
                            <div className="flex text-secondary mb-6">
                                <span className="material-symbols-outlined text-sm"
                                    style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-sm"
                                    style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-sm"
                                    style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-sm"
                                    style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-sm"
                                    style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            </div>
                            <p className="font-body-md text-on-surface-variant mb-8 italic">"Exceptional handling of a very
                                sensitive family matter. The team's discretion and empathy were as valuable as their legal
                                expertise."</p>
                            <div>
                                <p className="font-bold text-on-background">Eleanor Vance</p>
                                <p className="text-xs text-secondary font-label-caps uppercase">Private Client</p>
                            </div>
                        </div>
                        {/* Testimonial 3 */}
                        <div className="glass-card p-10 relative">
                            <div className="flex text-secondary mb-6">
                                <span className="material-symbols-outlined text-sm"
                                    style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-sm"
                                    style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-sm"
                                    style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-sm"
                                    style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-sm"
                                    style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            </div>
                            <p className="font-body-md text-on-surface-variant mb-8 italic">"Lex Sovereign is our go-to firm for all
                                international trade compliance. They are responsive, thorough, and always ahead of changes."</p>
                            <div>
                                <p className="font-bold text-on-background">Marcus Thorne</p>
                                <p className="text-xs text-secondary font-label-caps uppercase">Director, Global Logistics</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* FAQ Section */}
            <section className="py-section-padding bg-surface">
                <div className="max-w-3xl mx-auto px-margin-x">
                    <h2 className="font-headline-md text-center mb-12">Common <span className="text-secondary">Inquiries</span></h2>
                    <div className="space-y-4">
                        <div className="border-b border-outline-variant/10 py-6 group cursor-pointer accordion-item">
                            <div className="flex justify-between items-center group-hover:text-secondary transition-colors">
                                <h4 className="font-headline-sm text-[20px]">What areas of law do you practice?</h4>
                                <span className="material-symbols-outlined transition-transform duration-300">expand_more</span>
                            </div>
                            <div className="max-h-0 overflow-hidden transition-all duration-300 accordion-content">
                                <p className="pt-4 text-on-surface-variant">Advocate Muhammad Feroz Alam provides legal services in Civil Law, Criminal Law, Company Law, Trademark Matters, Tax & VAT Law, and Corporate Legal Advisory Services.</p>
                            </div>
                        </div>
                        <div className="border-b border-outline-variant/10 py-6 group cursor-pointer accordion-item">
                            <div className="flex justify-between items-center group-hover:text-secondary transition-colors">
                                <h4 className="font-headline-sm text-[20px]">Do you provide legal consultation for businesses?</h4>
                                <span className="material-symbols-outlined transition-transform duration-300">expand_more</span>
                            </div>
                            <div className="max-h-0 overflow-hidden transition-all duration-300 accordion-content">
                                <p className="pt-4 text-on-surface-variant">Yes. Legal consultation and advisory services are available for businesses, companies, and organizations on corporate governance, regulatory compliance, contracts, and commercial matters.</p>
                            </div>
                        </div>
                        <div className="border-b border-outline-variant/10 py-6 group cursor-pointer accordion-item">
                            <div className="flex justify-between items-center group-hover:text-secondary transition-colors">
                                <h4 className="font-headline-sm text-[20px]">How can I schedule a consultation?</h4>
                                <span className="material-symbols-outlined transition-transform duration-300">expand_more</span>
                            </div>
                            <div className="max-h-0 overflow-hidden transition-all duration-300 accordion-content">
                                <p className="pt-4 text-on-surface-variant">You can schedule a consultation by contacting our office via phone, email, or by submitting an inquiry through the website's contact form.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Contact Form Section */}
            <section className="py-section-padding bg-surface-container-high relative overflow-hidden" id="contact">
                <div className="max-w-container-max mx-auto px-margin-x">
                    <div className="grid lg:grid-cols-2 gap-20">
                        <div className="reveal">
                            <h2 className="font-headline-md text-on-background mb-8">Initiate <span
                                className="text-secondary">Consultation</span></h2>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            className="font-label-caps uppercase text-[10px] text-on-surface-variant mb-2 block">First
                                            Name</label>
                                        <input
                                            name="firstName"
                                            value={formData.firstName}
                                            className="w-full bg-background border-none focus:ring-2 focus:ring-secondary p-4 text-on-background"
                                            placeholder="John" type="text" onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label
                                            className="font-label-caps uppercase text-[10px] text-on-surface-variant mb-2 block">Last
                                            Name</label>
                                        <input
                                            name="lastName"
                                            value={formData.lastName}
                                            className="w-full bg-background border-none focus:ring-2 focus:ring-secondary p-4 text-on-background"
                                            placeholder="Doe" type="text" onChange={handleChange} />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="font-label-caps uppercase text-[10px] text-on-surface-variant mb-2 block ">Email
                                        Address</label>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        className="w-full bg-background border-none focus:ring-2 focus:ring-secondary p-4 text-on-background"
                                        placeholder="john.doe@example.com" type="email" onChange={handleChange} />
                                </div>
                                <div>
                                    <label
                                        className="font-label-caps uppercase text-[10px] text-on-surface-variant mb-2 block">Subject</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-background border-none focus:ring-2 focus:ring-secondary p-4 text-on-background">
                                        <option>Corporate Law</option>
                                        <option>Civil Litigation</option>
                                        <option>Family Law</option>
                                        <option>Other Inquiry</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="font-label-caps uppercase text-[10px] text-on-surface-variant mb-2 block">Your
                                        Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-background border-none focus:ring-2 focus:ring-secondary p-4 text-on-background"
                                        placeholder="Briefly describe your legal needs..." rows="4"></textarea>
                                </div>
                                <button
                                    disabled={status.submitting}
                                    className="w-full py-5 bg-secondary text-on-secondary-fixed font-label-caps uppercase font-bold tracking-widest hover:brightness-110 transition-all shadow-xl shadow-secondary/10 disabled:opacity-50"
                                    type="submit">
                                    {status.submitting ? 'Sending...' : 'Submit Request'}
                                </button>
                                {status.message && (
                                    <p className={`mt-4 text-center text-sm font-medium ${status.success ? 'text-secondary' : 'text-error'}`}>
                                        {status.message}
                                    </p>
                                )}
                            </form>
                        </div>
                        <div className="reveal">
                            <div className="mb-12">
                                <h3 className="font-headline-sm text-secondary mb-6">Chamber Details</h3>
                                <div className="space-y-6 text-on-surface-variant">
                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-secondary mt-1">account_balance</span>
                                        <div>
                                            <h4 className="font-bold text-on-background mb-1">Supreme Court Chamber</h4>
                                            <p>Hall Room #02, Supreme Court Bar Association Building,</p>
                                            <p>Shahbag, Dhaka-1000</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-secondary mt-1">location_on</span>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-bold text-on-background mb-1">Motijheel Chamber</h4>
                                                <p>City Center, 103, Motijheel C/A, Level-15, Dhaka-1000</p>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-on-background mb-1">Kotwaly Chamber</h4>
                                                <p>20 Kailash Gosh Lane, Arafat Monjil, Room No-10, Kotwaly, Dhaka-1100</p>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-on-background mb-1">Kadamtoly Chamber</h4>
                                                <p>Molla Tower (1st Floor) Mohammadbagh, Chowrasta, Kadamtoly, Dhaka-1362</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-secondary mt-1">phone_iphone</span>
                                        <div>
                                            <p>Mobile: 01819-460232, 01976-460232</p>
                                            <p>Tel: 02-7551536</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-secondary mt-1">mail</span>
                                        <div>
                                            <p>feroz_07@yahoo.com</p>
                                            <p>Feroz@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Map Placeholder */}
                            <div className="w-full h-80 bg-background border border-outline-variant/10 relative overflow-hidden">
                                <div
                                    className="absolute inset-0 grayscale opacity-40 hover:opacity-70 transition-opacity duration-500">
                                    <div className="w-full h-full bg-cover bg-center"
                                        data-alt="A stylized minimalist map of central Melbourne showing the legal district in dark blues and golds. The map is clean and professional with discrete markers for key institutions."
                                        data-location="Melbourne"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0UoFeDVi5zLVTvEkNwQqv1hliW_rDCB-iWXr2WtJTnPb589iB2Vvb8CS6auZ7aL2UDzEJ7Tn1IRN92k1xLTeZUfMGdvg_We760OQLFjSelYa9_uVROlxcnjj9elL3X7Mp6Pm0DYzrZhhuuMi6aCp5W4HxiQZMvXnC6-ikVcjTte-AjxcOkRyQYAwhtDrINuZRs5CkJHP8XPBQHOaVaL7E26NpIurXei-i9oEqC3aLPg1tvYvaIWpDcYiHJ04FoBu5YWZvHeYF5Ag')" }}>
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div
                                        className="bg-secondary text-on-secondary-fixed px-4 py-2 font-label-caps text-[10px] shadow-lg">
                                        VIEW LOCATION</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="bg-surface-container-lowest py-section-padding px-margin-x border-t border-outline-variant/10">
                <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between gap-stack-lg">
                    <div className="md:w-1/3">
                        <div className="mb-8">
                            <span className="font-headline-sm text-secondary uppercase tracking-widest text-[20px]">The Legal Care</span>
                        </div>
                        <p className="font-body-md text-on-surface-variant leading-relaxed">
                            With extensive experience in litigation and legal advisory services, Advocate Muhammad Feroz Alam delivers trusted legal solutions tailored to the needs of individuals and businesses. His practice is founded on professionalism, strategic insight, and unwavering dedication to protecting clients' interests.

                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-20">
                        <div>
                            <h5 className="text-secondary font-label-caps uppercase mb-8">Navigation</h5>
                            <ul className="space-y-4 font-body-md text-on-surface-variant">
                                <li><a className="hover:text-secondary transition-colors" href="#services">Practice Areas</a></li>
                                <li><a className="hover:text-secondary transition-colors" href="#about">About Me</a></li>
                                <li><a className="hover:text-secondary transition-colors" href="#testimonials">Insights</a></li>
                                <li><a className="hover:text-secondary transition-colors" href="#contact">Contact</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div
                    className="max-w-container-max mx-auto mt-20 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-label-caps text-on-surface-variant uppercase tracking-widest">
                    <p>Advocate Muhammad Feroz Alam</p>
                    <div className="flex gap-8">
                        <a className="hover:text-secondary transition-colors" href="#">LinkedIn</a>
                        <a className="hover:text-secondary transition-colors" href="#">Twitter</a>
                        <a className="hover:text-secondary transition-colors" href="#">Facebook</a>
                    </div>
                </div>
            </footer>

            {/* Lightbox Modal */}
            {lightboxIndex !== null && (
                <div 
                    className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col justify-center items-center p-4 transition-all duration-300"
                    onClick={closeLightbox}
                >
                    <div className="absolute top-0 inset-x-0 h-20 flex items-center justify-between px-margin-x max-w-container-max mx-auto bg-gradient-to-b from-background/80 to-transparent">
                        <span className="text-xs font-label-caps text-on-surface-variant uppercase tracking-widest">
                            Image {lightboxIndex + 1} of {galleryImages.length}
                        </span>
                        <button 
                            onClick={closeLightbox}
                            className="w-12 h-12 flex items-center justify-center border border-secondary/20 bg-background/85 hover:bg-secondary hover:text-on-secondary-fixed transition-all duration-300 shadow-xl cursor-pointer"
                            aria-label="Close lightbox"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>

                    <div className="relative max-w-5xl max-h-[75vh] flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
                        <img 
                            src={galleryImages[lightboxIndex]} 
                            alt={`Gallery image ${lightboxIndex + 1}`}
                            className="max-w-full max-h-[75vh] object-contain border border-secondary/10 shadow-2xl"
                        />
                    </div>

                    <div className="absolute bottom-8 flex items-center gap-6" onClick={(e) => e.stopPropagation()}>
                        <button 
                            onClick={lightboxPrev}
                            className="w-12 h-12 flex items-center justify-center border border-secondary/20 bg-background/60 hover:bg-secondary hover:text-on-secondary-fixed transition-all duration-300 shadow-xl cursor-pointer"
                            aria-label="Previous image"
                        >
                            <span className="material-symbols-outlined text-[24px]">chevron_left</span>
                        </button>
                        <button 
                            onClick={lightboxNext}
                            className="w-12 h-12 flex items-center justify-center border border-secondary/20 bg-background/60 hover:bg-secondary hover:text-on-secondary-fixed transition-all duration-300 shadow-xl cursor-pointer"
                            aria-label="Next image"
                        >
                            <span className="material-symbols-outlined text-[24px]">chevron_right</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
