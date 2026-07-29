'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Share2, 
  Download, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  Quote, 
  ArrowRight, 
  Image as ImageIcon, 
  Send,
  Eye,
  Sliders,
  Sparkle,
  FileText,
  FileImage,
  ChevronRight
} from 'lucide-react';

interface PostIdea {
  title: string;
  description: string;
  templateType: 'quote' | 'highlight' | 'tip' | 'general';
  visualDescription: string;
}

interface PostContent {
  caption: string;
  graphicTitle: string;
  graphicSubtitle: string;
  graphicPoints: string[];
  imagePrompt: string;
}

const COLOR_SCHEMES = [
  {
    name: 'Deep Violet (Brand)',
    id: 'brand',
    colors: ['#05050a', '#140c2b', '#261652'],
    accent: '#a855f7'
  },
  {
    name: 'Dark Emerald',
    id: 'emerald',
    colors: ['#040806', '#091f14', '#123d26'],
    accent: '#10b981'
  },
  {
    name: 'Sunset Crimson',
    id: 'sunset',
    colors: ['#080405', '#240b13', '#40101d'],
    accent: '#ef4444'
  },
  {
    name: 'Cyberpunk Blue',
    id: 'cyber',
    colors: ['#030712', '#0c1b40', '#10316b'],
    accent: '#06b6d4'
  },
  {
    name: 'Obsidian Metal',
    id: 'carbon',
    colors: ['#050507', '#111116', '#1e1e24'],
    accent: '#e4e4e7'
  }
];

export default function SocialAIPage() {
  // Navigation & Steps State: 1 = Brainstorming, 2 = Copy/Text generation, 3 = Media & Publishing
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [topic, setTopic] = useState('');
  
  // Ideas State
  const [generatingIdeas, setGeneratingIdeas] = useState(false);
  const [ideas, setIdeas] = useState<PostIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<PostIdea | null>(null);

  // Content Generation State (Text First)
  const [generatingContent, setGeneratingContent] = useState(false);
  const [content, setContent] = useState<PostContent | null>(null);

  // Editable fields for Step 2
  const [captionText, setCaptionText] = useState('');
  const [graphicTitle, setGraphicTitle] = useState('');
  const [graphicSubtitle, setGraphicSubtitle] = useState('');
  const [graphicPoints, setGraphicPoints] = useState<string[]>(['', '', '']);
  const [imagePrompt, setImagePrompt] = useState('');

  // Media Tab Selection in Step 3
  const [mediaMode, setMediaMode] = useState<'graphic' | 'text-only'>('graphic');

  // Canvas & Customization State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedScheme, setSelectedScheme] = useState(COLOR_SCHEMES[0]);
  const [templateType, setTemplateType] = useState<'quote' | 'highlight' | 'tip' | 'general'>('general');
  
  // Custom Background Image State
  const [bgImage, setBgImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Publishing State
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<{
    success: boolean;
    mocked?: boolean;
    postId?: string;
    postLink?: string;
    message?: string;
    error?: string;
  } | null>(null);

  // Preloaded Suggestions
  const suggestions = [
    'أهمية تطبيقات الموبايل للشركات الناشئة',
    'كتابة الكود النظيف Clean Code وأثره على المشروع',
    'ليه تصميم الـ UI/UX ممكن ينجّح أو يسبّب فشل موقعك',
    'مستقبل الذكاء الاصطناعي في تطوير المواقع SaaS'
  ];

  // Sync edit states when content is first generated
  useEffect(() => {
    if (content) {
      setGraphicTitle(content.graphicTitle || '');
      setGraphicSubtitle(content.graphicSubtitle || '');
      setCaptionText(content.caption || '');
      setImagePrompt(content.imagePrompt || '');
      if (content.graphicPoints && content.graphicPoints.length > 0) {
        const points = [...content.graphicPoints];
        while (points.length < 3) points.push('');
        setGraphicPoints(points);
      } else {
        setGraphicPoints(['', '', '']);
      }
    }
  }, [content]);

  // Redraw Canvas when dependencies change
  useEffect(() => {
    if (step === 3 && mediaMode === 'graphic') {
      drawCanvas();
    }
  }, [step, mediaMode, selectedScheme, templateType, graphicTitle, graphicSubtitle, graphicPoints, bgImage]);

  // Step 1: Brainstorm Post Ideas
  const handleGenerateIdeas = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setGeneratingIdeas(true);
    setIdeas([]);
    setSelectedIdea(null);
    setContent(null);
    setPublishResult(null);

    try {
      const response = await fetch('/api/social/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      if (data.ideas) {
        setIdeas(data.ideas);
      } else {
        alert(data.error || 'Failed to generate ideas. Please check console.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while generating ideas.');
    } finally {
      setGeneratingIdeas(false);
    }
  };

  // Step 1 -> Step 2: Select Idea & Generate Text
  const handleSelectIdea = async (idea: PostIdea) => {
    setSelectedIdea(idea);
    setTemplateType(idea.templateType);
    setGeneratingContent(true);
    setContent(null);
    setStep(2);

    try {
      const response = await fetch('/api/social/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ideaTitle: idea.title,
          ideaDescription: idea.description,
          templateType: idea.templateType
        }),
      });
      const data = await response.json();
      if (data.caption) {
        setContent(data);
      } else {
        alert(data.error || 'Failed to generate post details.');
        setStep(1);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while generating content.');
      setStep(1);
    } finally {
      setGeneratingContent(false);
    }
  };

  // Step 2 -> Step 3: Confirm Content and open media settings
  const handleConfirmContent = () => {
    setStep(3);
    setPublishResult(null);
  };

  // Handle Custom Background Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBgImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Draw on Canvas
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1200;
    const height = 1200;
    canvas.width = width;
    canvas.height = height;

    // 1. Draw Background
    if (bgImage) {
      const img = new Image();
      img.src = bgImage;
      img.onload = () => {
        const scale = Math.max(width / img.width, height / img.height);
        const x = (width - img.width * scale) / 2;
        const y = (height - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        ctx.fillStyle = 'rgba(5, 5, 10, 0.85)';
        ctx.fillRect(0, 0, width, height);

        drawGraphicElements(ctx, width, height);
      };
    } else {
      const grad = ctx.createRadialGradient(
        width / 2, height / 2, 100, 
        width / 2, height / 2, width * 0.8
      );
      grad.addColorStop(0, selectedScheme.colors[2]);
      grad.addColorStop(0.5, selectedScheme.colors[1]);
      grad.addColorStop(1, selectedScheme.colors[0]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      const dotSpacing = 40;
      for (let x = 0; x < width; x += dotSpacing) {
        for (let y = 0; y < height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      drawGraphicElements(ctx, width, height);
    }
  };

  // Draw Text and Branding Elements
  const drawGraphicElements = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const accentColor = selectedScheme.accent;
    const padding = 100;
    const contentWidth = width - padding * 2;

    // 1. Draw Branding (Header)
    ctx.font = 'bold 36px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.fillText('EVesters', padding, padding + 10);

    // Glowing Dot for Brand
    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.arc(padding + 168, padding + 0, 8, 0, Math.PI * 2);
    ctx.fill();

    // Sub-brand tagline
    ctx.font = '400 20px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillText('PREMIUM TECH SOLUTIONS', padding, padding + 40);

    ctx.strokeStyle = `rgba(255, 255, 255, 0.08)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding + 70);
    ctx.lineTo(width - padding, padding + 70);
    ctx.stroke();

    // 2. Draw Content by Template Type
    if (templateType === 'quote') {
      ctx.font = '900 280px Georgia, serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.textAlign = 'left';
      ctx.fillText('“', padding - 20, 420);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'italic 700 48px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
      
      const quoteText = graphicTitle || 'الكود النظيف ليس مجرد كود يعمل، بل كود يسهل تعديله وقراءته.';
      const quoteY = wrapText(ctx, `"${quoteText}"`, width / 2, 540, contentWidth - 40, 70);

      if (graphicSubtitle) {
        ctx.fillStyle = accentColor;
        ctx.font = 'bold 28px system-ui, sans-serif';
        ctx.fillText(graphicSubtitle, width / 2, quoteY + 90);
      }

    } else if (templateType === 'highlight') {
      ctx.textAlign = 'left';
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.strokeStyle = `rgba(${hexToRgb(accentColor)}, 0.3)`;
      ctx.lineWidth = 1.5;
      
      const badgeWidth = 180;
      const badgeHeight = 44;
      roundRect(ctx, padding, 240, badgeWidth, badgeHeight, 8, true, true);
      
      ctx.fillStyle = accentColor;
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('FEATURE IN FOCUS', padding + badgeWidth / 2, 268);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 54px system-ui, sans-serif';
      wrapText(ctx, graphicTitle || 'عنوان مميز للتصميم', padding, 350, contentWidth, 75);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '500 26px system-ui, sans-serif';
      wrapText(ctx, graphicSubtitle || 'تفاصيل إضافية أو وصف سريع للميزات المعروضة.', padding, 440, contentWidth, 40);

      let listY = 560;
      graphicPoints.forEach((point, idx) => {
        if (!point) return;
        
        ctx.fillStyle = `rgba(${hexToRgb(accentColor)}, 0.15)`;
        ctx.beginPath();
        ctx.arc(padding + 25, listY - 8, 22, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = accentColor;
        ctx.font = 'bold 20px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${idx + 1}`, padding + 25, listY - 1);

        ctx.fillStyle = '#ffffff';
        ctx.font = '600 24px system-ui, sans-serif';
        ctx.textAlign = 'left';
        wrapText(ctx, point, padding + 70, listY - 1, contentWidth - 80, 36);

        listY += 100;
      });

    } else if (templateType === 'tip') {
      const boxY = 280;
      const boxH = 580;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1.5;
      roundRect(ctx, padding, boxY, contentWidth, boxH, 20, true, true);

      ctx.fillStyle = accentColor;
      roundRect(ctx, padding, boxY, 8, boxH, {tl: 20, bl: 20, tr: 0, br: 0}, true, false);

      ctx.fillStyle = accentColor;
      ctx.font = 'bold 24px system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('💡 QUICK TIP / نصيحة سريعة', padding + 40, boxY + 60);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px system-ui, sans-serif';
      wrapText(ctx, graphicTitle || 'كيف تحسن أداء موقعك؟', padding + 40, boxY + 140, contentWidth - 80, 60);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '500 26px system-ui, sans-serif';
      const tipY = wrapText(ctx, graphicSubtitle || 'وصف سريع للمشكلة أو النصيحة.', padding + 40, boxY + 240, contentWidth - 80, 42);

      let pointY = tipY + 60;
      graphicPoints.forEach((point) => {
        if (!point) return;
        ctx.fillStyle = accentColor;
        ctx.font = 'bold 24px system-ui, sans-serif';
        ctx.fillText('✓', padding + 45, pointY + 2);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '500 22px system-ui, sans-serif';
        wrapText(ctx, point, padding + 80, pointY, contentWidth - 120, 34);
        pointY += 75;
      });

    } else {
      ctx.textAlign = 'left';
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 64px system-ui, sans-serif';
      const titleEndY = wrapText(ctx, graphicTitle || 'مستقبل البرمجة مع Devesters', padding, 360, contentWidth, 85);

      ctx.fillStyle = accentColor;
      ctx.fillRect(padding, titleEndY + 35, 120, 6);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '500 28px system-ui, sans-serif';
      const subEndY = wrapText(ctx, graphicSubtitle || 'تفاصيل وشرح أعمق للموضوع.', padding, titleEndY + 90, contentWidth, 44);

      let listY = subEndY + 60;
      graphicPoints.forEach((point) => {
        if (!point) return;
        ctx.fillStyle = `rgba(${hexToRgb(accentColor)}, 0.1)`;
        roundRect(ctx, padding, listY - 25, contentWidth, 54, 8, true, false);

        ctx.fillStyle = accentColor;
        ctx.font = 'bold 22px system-ui, sans-serif';
        ctx.fillText('✦', padding + 25, listY + 8);

        ctx.fillStyle = '#ffffff';
        ctx.font = '600 22px system-ui, sans-serif';
        ctx.fillText(point, padding + 70, listY + 8);
        
        listY += 80;
      });
    }

    // 3. Draw Footer (Branding)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding - 40);
    ctx.lineTo(width - padding, height - padding - 40);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '500 18px system-ui, sans-serif';
    ctx.fillText('devesters.com  |  info@devesters.com', padding, height - padding);

    ctx.textAlign = 'right';
    ctx.fillStyle = accentColor;
    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.fillText('SHAPING THE FUTURE', width - padding, height - padding);
  };

  // Helper Canvas Drawing methods
  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '168, 85, 247';
  };

  const roundRect = (
    ctx: CanvasRenderingContext2D, 
    x: number, y: number, w: number, h: number, 
    radius: any, fill: boolean, stroke: boolean
  ) => {
    let r = { tl: 0, tr: 0, br: 0, bl: 0 };
    if (typeof radius === 'number') {
      r = { tl: radius, tr: radius, br: radius, bl: radius };
    } else if (radius) {
      r = { ...r, ...radius };
    }
    ctx.beginPath();
    ctx.moveTo(x + r.tl, y);
    ctx.lineTo(x + w - r.tr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr);
    ctx.lineTo(x + w, y + h - r.br);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
    ctx.lineTo(x + r.bl, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl);
    ctx.lineTo(x, y + r.tl);
    ctx.quadraticCurveTo(x, y, x + r.tl, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  };

  const wrapText = (
    ctx: CanvasRenderingContext2D, 
    text: string, x: number, y: number, 
    maxWidth: number, lineHeight: number
  ) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
    return currentY;
  };

  // Action: Download Graphic Locally
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `devesters-post-${Date.now()}.png`;
    link.href = url;
    link.click();
  };

  // Action: Publish (with or without Image) to Facebook API
  const handlePublish = async () => {
    if (!captionText.trim()) return;

    setPublishing(true);
    setPublishResult(null);

    try {
      let imageUrl = null;
      if (mediaMode === 'graphic') {
        const canvas = canvasRef.current;
        if (canvas) {
          imageUrl = canvas.toDataURL('image/png');
        }
      }

      const response = await fetch('/api/social/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageUrl,
          caption: captionText
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = { error: `Server returned status code ${response.status}` };
      }

      if (!response.ok) {
        setPublishResult({
          success: false,
          error: data.error || `Failed to publish (status ${response.status})`
        });
      } else {
        setPublishResult(data);
      }
    } catch (err: any) {
      console.error(err);
      setPublishResult({
        success: false,
        error: err.message || 'An error occurred while posting to Facebook.'
      });
    } finally {
      setPublishing(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setIdeas([]);
    setSelectedIdea(null);
    setContent(null);
    setPublishResult(null);
    setBgImage(null);
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#050509] text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
            Social AI Content Creator
          </h1>
          <p className="text-zinc-400 mt-1 text-sm md:text-base">
            Create post texts using Gemini, review the copy, and publish branded graphics or text-only updates directly to Facebook.
          </p>
        </div>
        {step > 1 && (
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Start Over
          </button>
        )}
      </div>

      {/* Stepper Progress Bar */}
      <div className="flex items-center gap-2 mb-8 max-w-2xl">
        <div className={`flex items-center gap-1.5 text-sm font-semibold ${step >= 1 ? 'text-purple-400' : 'text-zinc-500'}`}>
          <span className="w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xs">1</span>
          Brainstorm
        </div>
        <ChevronRight className="w-4 h-4 text-zinc-600" />
        <div className={`flex items-center gap-1.5 text-sm font-semibold ${step >= 2 ? 'text-purple-400' : 'text-zinc-500'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-zinc-800 border border-transparent'}`}>2</span>
          Post Copy & Text
        </div>
        <ChevronRight className="w-4 h-4 text-zinc-600" />
        <div className={`flex items-center gap-1.5 text-sm font-semibold ${step >= 3 ? 'text-purple-400' : 'text-zinc-500'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-zinc-800 border border-transparent'}`}>3</span>
          Choose Media & Publish
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Setup & Customizations */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Step 1: Input Topic & Brainstorming */}
          {step === 1 && (
            <div className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkle className="w-5 h-5 text-purple-400" />
                1. What topic is on your mind?
              </h2>
              
              <form onSubmit={handleGenerateIdeas} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Importance of UI/UX, or why clean code matters..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={generatingIdeas || !topic.trim()}
                    className="absolute right-2 top-2 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-medium text-sm px-4 py-1.5 rounded-md flex items-center gap-1.5 transition-colors"
                  >
                    {generatingIdeas ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    Brainstorm
                  </button>
                </div>

                {/* Suggestions Grid */}
                <div>
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">Try these topics:</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setTopic(s)}
                        className="text-left text-sm text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 px-3 py-2 rounded-lg transition-all truncate"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </form>

              {/* Ideas Display */}
              {ideas.length > 0 && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-md font-bold text-zinc-300">Choose one of the generated ideas:</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {ideas.map((idea, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => handleSelectIdea(idea)}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 p-5 rounded-xl cursor-pointer group transition-all"
                      >
                        <div className="flex justify-between items-start gap-3 mb-2">
                          <span className="text-xs font-bold px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/20 rounded uppercase">
                            {idea.templateType}
                          </span>
                          <span className="text-zinc-500 text-xs font-medium">Idea {idx + 1}</span>
                        </div>
                        <h4 className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors">{idea.title}</h4>
                        <p className="text-sm text-zinc-400 mt-1">{idea.description}</p>
                        <div className="mt-4 flex items-center gap-1 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
                          Select and Generate Copy <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Content Copy Editor (Text First) */}
          {step === 2 && (
            <div className="space-y-6">
              {generatingContent ? (
                <div className="bg-[#0a0a0f] border border-white/10 rounded-xl p-12 text-center">
                  <RefreshCw className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
                  <h3 className="font-bold text-lg">Generating Post Copy...</h3>
                  <p className="text-sm text-zinc-400 mt-2">Gemini is crafting a premium caption and text components first.</p>
                </div>
              ) : (
                content && (
                  <>
                    {/* Caption Box */}
                    <div className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Send className="w-5 h-5 text-purple-400" />
                        2. Review & Edit Post Caption
                      </h2>
                      <div className="space-y-3">
                        <textarea
                          rows={10}
                          value={captionText}
                          onChange={(e) => setCaptionText(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors leading-relaxed"
                        />
                        <p className="text-xs text-zinc-500">
                          This is the text description for Facebook. You can modify contact details, spacing, or emojis.
                        </p>
                      </div>
                    </div>

                    {/* Graphic Card Text customization */}
                    <div className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Sliders className="w-5 h-5 text-purple-400" />
                        3. Edit Graphic Content Copy
                      </h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Graphic Title</label>
                          <input
                            type="text"
                            value={graphicTitle}
                            onChange={(e) => setGraphicTitle(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Graphic Subtitle / Tagline</label>
                          <input
                            type="text"
                            value={graphicSubtitle}
                            onChange={(e) => setGraphicSubtitle(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50"
                          />
                        </div>

                        {templateType !== 'quote' && (
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Key Highlights / Points</label>
                            {graphicPoints.map((point, index) => (
                              <input
                                key={index}
                                type="text"
                                value={point}
                                onChange={(e) => {
                                  const updated = [...graphicPoints];
                                  updated[index] = e.target.value;
                                  setGraphicPoints(updated);
                                }}
                                placeholder={`Bullet point ${index + 1}`}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50"
                              />
                            ))}
                          </div>
                        )}
                        
                        <div className="pt-4">
                          <button
                            onClick={handleConfirmContent}
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/20"
                          >
                            Confirm Post Content & Proceed <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
          )}

          {/* Step 3: Media Type Selection & Publishing */}
          {step === 3 && (
            <div className="space-y-6">
              
              {/* Media Selection Tabs */}
              <div className="bg-[#0a0a0f] border border-white/10 rounded-xl p-4">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-3">Choose Media Presentation Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMediaMode('graphic');
                      setPublishResult(null);
                    }}
                    className={`flex items-center justify-center gap-2 py-3 rounded-lg font-bold border transition-all ${
                      mediaMode === 'graphic'
                        ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <FileImage className="w-5 h-5" />
                    Branded Graphic Card
                  </button>
                  <button
                    onClick={() => {
                      setMediaMode('text-only');
                      setPublishResult(null);
                    }}
                    className={`flex items-center justify-center gap-2 py-3 rounded-lg font-bold border transition-all ${
                      mediaMode === 'text-only'
                        ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                    Text-Only Post
                  </button>
                </div>
              </div>

              {/* Graphic Card Styling Options */}
              {mediaMode === 'graphic' && (
                <div className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-purple-400" />
                    Branded Graphic Customization
                  </h3>

                  {/* Template Type Selector */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">Template Layout Style</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[
                        { id: 'general', name: 'General Banner' },
                        { id: 'quote', name: 'Quote Card' },
                        { id: 'highlight', name: 'Highlight List' },
                        { id: 'tip', name: 'Tip & Trick' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTemplateType(t.id as any)}
                          className={`px-3 py-2 text-xs font-bold rounded-lg border transition-all ${
                            templateType === t.id 
                              ? 'bg-purple-600/20 border-purple-500 text-white' 
                              : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {t.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Scheme Picker */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">Gradient Color Themes</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {COLOR_SCHEMES.map((scheme) => (
                        <button
                          key={scheme.id}
                          onClick={() => {
                            setBgImage(null);
                            setSelectedScheme(scheme);
                          }}
                          className={`flex items-center gap-2.5 p-2 rounded-lg border text-left transition-all ${
                            selectedScheme.id === scheme.id && !bgImage
                              ? 'bg-white/10 border-white/30 text-white'
                              : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                          }`}
                        >
                          <div className="flex gap-1">
                            <span className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: scheme.colors[0] }} />
                            <span className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: scheme.colors[2] }} />
                          </div>
                          <span className="text-xs font-medium truncate">{scheme.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Background Image Upload */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">Or Use Custom Background Image</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-lg text-sm flex items-center gap-2 transition-all hover:border-white/20"
                      >
                        <ImageIcon className="w-4 h-4" /> Upload Background
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      {bgImage && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-green-400 flex items-center gap-1 font-semibold">
                            <Check className="w-3.5 h-3.5" /> Background Active
                          </span>
                          <button
                            onClick={() => {
                              setBgImage(null);
                              drawCanvas();
                            }}
                            className="text-xs text-red-400 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Image prompt suggestion */}
                  {imagePrompt && (
                    <div className="bg-purple-950/20 border border-purple-500/10 p-4 rounded-xl">
                      <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Gemini Visual Recommendation:
                      </h4>
                      <p className="text-xs text-zinc-400 italic">
                        {imagePrompt}
                      </p>
                    </div>
                  )}

                  {/* Graphic Card Actions */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleDownload}
                      className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Download className="w-5 h-5" /> Download PNG
                    </button>

                    <button
                      onClick={handlePublish}
                      disabled={publishing}
                      className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-purple-600/20"
                    >
                      {publishing ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" /> Publishing...
                        </>
                      ) : (
                        <>
                          <Share2 className="w-5 h-5" /> Publish Branded Post
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Text Only Confirmation Details */}
              {mediaMode === 'text-only' && (
                <div className="bg-[#0a0a0f] border border-white/10 rounded-xl p-6 space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    Review Text-Only Post
                  </h3>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-900/40 border border-purple-500/20 flex items-center justify-center font-bold text-purple-400 text-sm">
                        DV
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Devesters</h4>
                        <span className="text-zinc-500 text-[10px]">Just now · Facebook Page</span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap">{captionText}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={handlePublish}
                      disabled={publishing}
                      className="w-full px-4 py-3.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-purple-600/20"
                    >
                      {publishing ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" /> Publishing...
                        </>
                      ) : (
                        <>
                          <Share2 className="w-5 h-5" /> Publish Text-Only Post
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Publish Result Feedback */}
              {publishResult && (
                <div className={`p-4 rounded-xl border ${
                  publishResult.success 
                    ? 'bg-green-950/20 border-green-500/30 text-green-300' 
                    : 'bg-red-950/20 border-red-500/30 text-red-300'
                }`}>
                  <div className="flex items-start gap-3">
                    {publishResult.success ? (
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    
                    <div className="flex-1 space-y-1.5">
                      <h4 className="font-bold text-sm">
                        {publishResult.success ? 'Success!' : 'Failed to Publish'}
                      </h4>
                      <p className="text-xs leading-relaxed">
                        {publishResult.message || publishResult.error}
                      </p>
                      
                      {publishResult.success && publishResult.postId && (
                        <div className="pt-1">
                          <a 
                            href={publishResult.postLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-green-400 hover:underline"
                          >
                            View Post on Facebook <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Right Side: Visual Canvas Live Preview (Only visible in Graphic mode, or shows mockup layout) */}
        <div className="lg:col-span-5 flex flex-col items-center gap-4">
          <div className="w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-purple-400" />
                Live Post Preview
              </span>
              <span className="text-xs text-zinc-500">
                {mediaMode === 'graphic' ? '1200 x 1200 px' : 'Text-Only Feed'}
              </span>
            </div>
            
            {mediaMode === 'graphic' ? (
              /* Canvas wrapper */
              <div className="w-full aspect-square bg-[#030307] rounded-xl overflow-hidden border border-white/5 shadow-2xl relative flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              /* Facebook post style mockup for text post */
              <div className="w-full bg-[#111116] border border-white/10 rounded-xl p-5 shadow-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-900/40 border border-purple-500/20 flex items-center justify-center font-bold text-purple-400 text-sm">
                    DV
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Devesters</h4>
                    <span className="text-zinc-500 text-[10px] block">Just now · Facebook</span>
                  </div>
                </div>
                
                <p className="text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto pr-1">
                  {captionText || 'No caption text generated yet. Select an idea and generate content first.'}
                </p>

                <div className="border-t border-white/5 pt-3 flex justify-between text-xs text-zinc-500">
                  <span>👍 Like</span>
                  <span>💬 Comment</span>
                  <span>🔁 Share</span>
                </div>
              </div>
            )}

            <p className="text-xs text-zinc-500 text-center">
              {mediaMode === 'graphic' 
                ? 'The preview reflects all text and style changes in real-time. Use the options on the left to customize before publishing.'
                : 'Showing how the text post will display on your Facebook page feed.'
              }
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
