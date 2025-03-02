import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MdExpandMore, MdExpandLess, MdSearch, MdHelpOutline, MdArticle, MdQuestionAnswer, MdContactSupport, MdChat, MdEmail } from 'react-icons/md';
import Card from '../Components/UI/Card';
import Button from '../Components/UI/Button';

function FAQ() {
    const { t } = useTranslation();
    const [openQuestion, setOpenQuestion] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [animateItems, setAnimateItems] = useState(false);
    const [activeCategory, setActiveCategory] = useState('General');

    // Animation trigger when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateItems(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const faqCategories = [
        { id: 'General', icon: MdHelpOutline, color: 'bg-blue-100 text-blue-600' },
        { id: 'Account', icon: MdArticle, color: 'bg-green-100 text-green-600' },
        { id: 'Services', icon: MdQuestionAnswer, color: 'bg-purple-100 text-purple-600' },
        { id: 'Technical', icon: MdContactSupport, color: 'bg-yellow-100 text-yellow-600' }
    ];

    // Use a function to get all FAQs from translations
    const getAllFaqs = () => ({
        'General': [
            { 
                question: t('FAQ.Categories.General.Q1'), 
                answer: t('FAQ.Categories.General.A1') 
            },
            { 
                question: t('FAQ.Categories.General.Q2'), 
                answer: t('FAQ.Categories.General.A2') 
            },
        ],
        'Account': [
            { 
                question: t('FAQ.Categories.Account.Q1'), 
                answer: t('FAQ.Categories.Account.A1') 
            },
            { 
                question: t('FAQ.Categories.Account.Q2'), 
                answer: t('FAQ.Categories.Account.A2') 
            },
        ],
        'Services': [
            { 
                question: t('FAQ.Categories.Services.Q1'), 
                answer: t('FAQ.Categories.Services.A1') 
            },
            { 
                question: t('FAQ.Categories.Services.Q2'), 
                answer: t('FAQ.Categories.Services.A2') 
            },
        ],
        'Technical': [
            { 
                question: t('FAQ.Categories.Technical.Q1'), 
                answer: t('FAQ.Categories.Technical.A1') 
            },
            { 
                question: t('FAQ.Categories.Technical.Q2'), 
                answer: t('FAQ.Categories.Technical.A2') 
            },
        ]
    });

    const allFaqs = getAllFaqs();

    // Filter FAQs based on search and active category
    const filteredFaqs = allFaqs[activeCategory]?.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800 transition-all duration-300 ease-in-out">
                    {t('FAQ.Title')}
                </h2>
                <Button 
                    variant="primary"
                    className="flex items-center gap-2.5 px-5 py-2.5 group transition-all duration-300 ease-in-out hover:scale-105 shadow-sm font-medium"
                >
                    <MdContactSupport className="text-xl" />
                    {t('FAQ.ContactSupport')}
                </Button>
            </div>

            {/* Search Box */}
            <Card className={`
                p-4 transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '100ms' }}
            >
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t('FAQ.SearchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 border rounded-lg focus:ring-1 focus:ring-blue-500 transition-colors duration-300"
                    />
                    <MdSearch className="absolute left-3 top-3.5 text-gray-400 text-xl" />
                </div>
            </Card>

            {/* FAQ Categories */}
            <div className={`
                grid grid-cols-1 md:grid-cols-4 gap-4
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '200ms' }}
            >
                {faqCategories.map((category, index) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === category.id;
                    return (
                        <Card 
                            key={category.id}
                            hover
                            className={`
                                p-4 text-center transition-all duration-300 hover:-translate-y-1 cursor-pointer
                                ${isActive ? 'ring-2 ring-blue-500 shadow-md' : ''}
                            `}
                            style={{ transitionDelay: `${index * 50}ms` }}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            <div className="flex flex-col items-center">
                                <div className={`p-3 rounded-full mb-2 ${category.color}`}>
                                    <Icon className="text-xl" />
                                </div>
                                <span className="font-medium">{t(`FAQ.CategoryNames.${category.id}`)}</span>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* FAQ Accordion */}
            <Card className={`
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '300ms' }}
            >
                <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">{t(`FAQ.CategoryNames.${activeCategory}`)}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        {searchTerm 
                            ? t('FAQ.SearchResults', { count: filteredFaqs.length })
                            : t('FAQ.ShowingQuestions', { count: filteredFaqs.length })}
                    </p>
                </div>
                
                <div className="divide-y divide-gray-100">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className="border-b last:border-0 transition-all duration-300"
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <button
                                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                                    onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                                >
                                    <span className="font-medium text-gray-800">{faq.question}</span>
                                    <div className="transition-transform duration-300 ease-in-out transform">
                                        {openQuestion === index ? (
                                            <MdExpandLess className="text-2xl text-gray-500" />
                                        ) : (
                                            <MdExpandMore className="text-2xl text-gray-500" />
                                        )}
                                    </div>
                                </button>
                                <div 
                                    className={`
                                        px-6 py-4 bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out
                                        ${openQuestion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                                    `}
                                >
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            {searchTerm 
                                ? t('FAQ.NoResultsSearch') 
                                : t('FAQ.NoQuestionsCategory')}
                        </div>
                    )}
                </div>
            </Card>

            {/* Contact Us Banner - Enhanced styling */}
            <div className={`
                bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white
                transition-all duration-500 ease-in-out shadow-lg
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
                border border-blue-300 border-opacity-20
            `}
            style={{ transitionDelay: '400ms' }}
            >
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-xl font-bold mb-2">{t('FAQ.StillHaveQuestions')}</h3>
                        <p className="mt-1 text-blue-100">{t('FAQ.SupportTeamMessage')}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            variant="light"
                            className="whitespace-nowrap bg-white text-blue-600 border-white hover:bg-blue-50 
                                      transition-all duration-300 px-6 py-2.5 rounded-full font-medium
                                      flex items-center justify-center gap-2 shadow-md hover:shadow-lg
                                      transform hover:-translate-y-1 focus:ring-4 focus:ring-white focus:ring-opacity-30"
                        >
                            <MdChat className="text-xl" />
                            {t('FAQ.LiveChat')}
                        </Button>
                        <Button
                            variant="secondary"
                            className="whitespace-nowrap bg-transparent text-grey border-2 border-white 
                                      hover:bg-white hover:text-blue-700 transition-all duration-300
                                      px-6 py-2.5 rounded-full font-medium flex items-center justify-center gap-2
                                      shadow-md hover:shadow-lg transform hover:-translate-y-1"
                        >
                            <MdEmail className="text-xl" />
                            {t('FAQ.EmailSupport')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQ;
