import React, { useEffect, useState, useRef } from 'react';
import { X, Loader2, Lightbulb, ExternalLink } from 'lucide-react';
import { Dua, Translation, Language, GeminiApiKeyStatus } from '../types';
import { getDuaExplanationStream, getGeminiApiKeyStatus, openGeminiApiKeySelector } from '../services/geminiService';

interface DuaExplainerModalProps {
    isOpen: boolean;
    onClose: () => void;
    dua: Dua | null;
    t: (key: string) => string;
    isRTL: boolean;
    language: Language;
}

const DuaExplainerModal: React.FC<DuaExplainerModalProps> = ({ isOpen, onClose, dua, t, isRTL, language }) => {
    const [explanation, setExplanation] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [geminiApiKeyStatus, setGeminiApiKeyStatus] = useState<GeminiApiKeyStatus>(GeminiApiKeyStatus.UNKNOWN);
    const explanationRef = useRef<HTMLDivElement>(null);

    const checkGeminiKeyStatus = async () => {
        try {
            const isSelected = await getGeminiApiKeyStatus();
            setGeminiApiKeyStatus(isSelected ? GeminiApiKeyStatus.SELECTED : GeminiApiKeyStatus.NOT_SELECTED);
        } catch (e) {
            console.error("Error checking Gemini API key status:", e);
            setGeminiApiKeyStatus(GeminiApiKeyStatus.ERROR);
            setError(t('explanation_error') || "Error checking API key status.");
        }
    };

    const fetchExplanation = async () => {
        if (!dua || geminiApiKeyStatus !== GeminiApiKeyStatus.SELECTED) return;

        setIsLoading(true);
        setExplanation('');
        setError(null);

        try {
            const stream = await getDuaExplanationStream(dua.arabic, dua.transliteration, dua.english);
            const reader = stream.getReader();
            let accumulatedExplanation = '';

            const read = async () => {
                const { done, value } = await reader.read();
                if (done) {
                    setIsLoading(false);
                    return;
                }

                accumulatedExplanation += value;
                setExplanation(accumulatedExplanation);
                if (explanationRef.current) {
                    explanationRef.current.scrollTop = explanationRef.current.scrollHeight; // Auto-scroll
                }
                read(); // Continue reading
            };
            await read();

        } catch (err: any) {
            console.error("Error fetching Dua explanation:", err);
            // Check for specific API key issue error message from the service
            if (err.message && err.message.includes("API_KEY_ISSUE")) {
                setError(t('gemini_api_not_selected')); // Use the generic message for unselected key
                setGeminiApiKeyStatus(GeminiApiKeyStatus.NOT_SELECTED); // Reset status to prompt user again
            } else {
                setError(err.message || (t('explanation_error') || "Failed to get explanation."));
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            checkGeminiKeyStatus();
        } else {
            document.body.style.overflow = 'unset';
            setExplanation('');
            setError(null);
            setIsLoading(false);
            setGeminiApiKeyStatus(GeminiApiKeyStatus.UNKNOWN);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && dua && geminiApiKeyStatus === GeminiApiKeyStatus.SELECTED) {
            fetchExplanation();
        }
    }, [isOpen, dua, geminiApiKeyStatus]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSelectApiKey = async () => {
        try {
            await openGeminiApiKeySelector();
            // Assume selection was successful for immediate UI update, actual key check will re-run
            setGeminiApiKeyStatus(GeminiApiKeyStatus.SELECTED);
            // After selection, if a Dua is already selected and modal is open, try fetching again
            if (dua && isOpen) {
                // Short delay to allow env var to propagate, then re-fetch
                setTimeout(() => fetchExplanation(), 100); 
            }
        } catch (e) {
            console.error("Error opening API key selector:", e);
            setGeminiApiKeyStatus(GeminiApiKeyStatus.ERROR);
            setError(t('gemini_api_select_key_error') || "Failed to open API key selector.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-slate-900 w-full max-w-4xl h-full sm:h-[90vh] sm:rounded-2xl shadow-2xl border-none sm:border border-slate-700 flex flex-col relative" dir={isRTL ? 'rtl' : 'ltr'}>
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900 sm:rounded-t-2xl z-10">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-purple-400" /> {t('dua_explanation_title')}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded-lg ml-2"
                        title={t('close') || 'Close'}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 scrollbar-hide bg-[#1a1c23]" ref={explanationRef}>
                    {dua && (
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-6">
                            <p className="text-xl sm:text-2xl font-arabic text-right leading-loose text-white font-serif mb-2" dir="rtl">
                                {dua.arabic}
                            </p>
                            <p className="text-slate-300 italic text-sm mb-2">{dua.transliteration}</p>
                            <p className="text-slate-200 leading-relaxed text-sm">{dua.english}</p>
                            <p className="text-xs text-slate-500 mt-2">{t('source')}: {dua.reference}</p>
                        </div>
                    )}

                    {geminiApiKeyStatus === GeminiApiKeyStatus.NOT_SELECTED && !isLoading && (
                        <div className="bg-red-900/20 border border-red-700 rounded-xl p-4 text-center">
                            <p className="text-red-400 mb-3">{t('gemini_api_not_selected')}</p>
                            <button onClick={handleSelectApiKey} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg flex items-center gap-2 mx-auto">
                                <ExternalLink className="w-5 h-5" /> {t('gemini_api_select_key')}
                            </button>
                            <p className="text-xs text-red-300 mt-2">{t('gemini_api_billing_info')}</p>
                        </div>
                    )}

                    {isLoading && (
                        <div className="flex flex-col items-center justify-center h-48 text-purple-400">
                            <Loader2 className="w-8 h-8 animate-spin mb-3" />
                            <p>{t('explanation_loading')}</p>
                        </div>
                    )}

                    {error && geminiApiKeyStatus !== GeminiApiKeyStatus.NOT_SELECTED && ( // Only show error if not already showing "not selected" state
                        <div className="flex flex-col items-center justify-center h-48 text-red-400">
                            <p>{error}</p>
                            {geminiApiKeyStatus === GeminiApiKeyStatus.SELECTED && ( // Only show retry if key is selected
                                <button
                                    onClick={fetchExplanation}
                                    className="mt-4 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-white text-sm"
                                >
                                    {t('try_again')}
                                </button>
                            )}
                        </div>
                    )}

                    {explanation && (
                        <div className="prose prose-invert max-w-none text-slate-200">
                            {/* Render markdown-like explanation. Basic styling for paragraphs/headings can be applied. */}
                            {explanation.split('\n').map((paragraph, index) => {
                                if (paragraph.startsWith('### ')) {
                                    return <h4 key={index} className="text-xl font-semibold text-purple-300 mt-4 mb-2">{paragraph.substring(4)}</h4>;
                                }
                                if (paragraph.startsWith('## ')) {
                                    return <h3 key={index} className="text-2xl font-bold text-purple-400 mt-6 mb-3">{paragraph.substring(3)}</h3>;
                                }
                                if (paragraph.startsWith('* ')) {
                                    return <li key={index} className="ml-4 text-slate-300">{paragraph.substring(2)}</li>;
                                }
                                return <p key={index} className="mb-3 text-slate-300 leading-relaxed">{paragraph}</p>;
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DuaExplainerModal;